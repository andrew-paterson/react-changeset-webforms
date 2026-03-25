import React, { useEffect, useCallback, useState } from 'react';
import ValidatingFieldWrapper from './ValidatingFieldWrapper.jsx';

/**
 * ValidatingField
 *
 * The top-level field orchestrator. It:
 *  - Guards render: skips if no changeset, field is omitted, or fieldType is "noDisplay".
 *  - Delegates to ValidatingFieldWrapper for single fields, or a ValidatingCloneGroup
 *    for clone-group fields (stub — wire up when that component exists).
 *  - Runs field lifecycle on mount/unmount (insert, willDestroy).
 *  - Exposes updateFieldValue, validateField, and onUserInteraction callbacks.
 *
 * Props:
 *  - formField               {object}    The field model.
 *  - formFields              {object[]}  All fields in the form.
 *  - formSettings            {object}    Form-level settings.
 *  - changesetWebform        {object}    Parent webform instance.
 *  - dataTestId              {string}    Optional override for data-test-id.
 *  - dataTestFormName        {string}    data-test-form-name attribute.
 *  - labelId                 {string}    Passed through to FieldLabel.
 *  - onUserInteraction       {Function}  Called on any user interaction.
 *  - afterFieldInserted      {Function}  Called after mount.
 *  - afterFieldRemoved       {Function}  Called after unmount.
 *  - afterClickAddCloneButton {Function} Clone-group callback.
 *  - onFormSubmit            {Function}  Submit handler forwarded to field control.
 */
export default function ValidatingField({ formField, formFields, formSettings, changesetWebform, dataTestId, dataTestFormName, onUserInteraction: onUserInteractionProp, afterFieldInserted, afterFieldRemoved, afterClickAddCloneButton, onFormSubmit }) {
  // Guard: skip rendering entirely when conditions are not met
  const shouldRender = changesetWebform?.changeset && !formField?.isOmitted && formField?.fieldType !== 'noDisplay';

  // Incrementing this counter after async validation completes is the only way
  // to tell React that formField.validationErrors (a getter on the changeset
  // class instance) has changed, since React cannot observe mutations on
  // plain objects/class instances.
  const [, forceUpdate] = useState(0);

  const validateField = useCallback(async (field) => {
    await field.validate({ skipUnvalidated: true });
    // Changeset errors have now been updated on the class instance — tell React.
    forceUpdate((n) => n + 1);
  }, []);

  const updateFieldValue = useCallback(
    (value) => {
      if (!formField) return;
      // updateValue mutates the changeset synchronously (sets the new value)
      // and then kicks off an async validate internally.
      // Fire forceUpdate immediately so the new fieldValue is reflected, then
      // again once the internal validate promise resolves so validation errors
      // (and all derived getters) are also reflected.
      const result = formField.updateValue(value);
      forceUpdate((n) => n + 1);
      if (result && typeof result.then === 'function') {
        result.then(() => forceUpdate((n) => n + 1));
      }
    },
    [formField, forceUpdate],
  );

  const onUserInteraction = useCallback(
    (eventName, value, event) => {
      if (!formField || formField.disabled) return;
      formField.eventLog.push(eventName);
      validateField(formField);
      onUserInteractionProp?.(formField, eventName, value, event);
    },
    [formField, validateField, onUserInteractionProp],
  );

  // Equivalent of {{did-insert}} — runs after the element mounts
  const didInsert = useCallback(
    (element) => {
      if (!formField || !element) return;
      formField.eventLog = formField.eventLog || []; // TODO should not be required.
      formField.eventLog.push('insert');
      if (formField.fieldValue) {
        formField.eventLog.push('insertWithValue');
      }
      // Defer so the DOM is fully painted before querying
      setTimeout(() => {
        formField.customValidityEls = element.querySelectorAll('[data-set-custom-validity]');
      });
      validateField(formField);
      afterFieldInserted?.(formField);
    },
    [formField, validateField, afterFieldInserted],
  );

  // Equivalent of {{will-destroy}}
  useEffect(() => {
    return () => {
      afterFieldRemoved?.(formField);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!shouldRender) {
    return null;
  }

  // Clone-group fields: render a ValidatingCloneGroup (stub until available)
  if (formField.cloneGroupName) {
    // TODO: replace with <ValidatingCloneGroup ... /> once created
    return (
      <div
        data-clone-group-placeholder
        data-field-id={formField.id}
      >
        {/* ValidatingCloneGroup goes here */}
      </div>
    );
  }

  // Single (non-clone-group) field
  const FieldComponent = formField.componentClass;
  const dataTestFieldId = dataTestId || formField.id;

  return (
    <ValidatingFieldWrapper
      ref={didInsert}
      formField={formField}
      dataTestFieldId={dataTestFieldId}
      changesetWebform={changesetWebform}
      labelId={formField.labelId}
      ariaLabelledBy={formField.ariaLabelledBy}
      ariaLabel={formField.ariaLabel}
      validationErrorsArray={formField.validationErrors}
      data-test-cwf-field
    >
      {FieldComponent && (
        <FieldComponent
          formField={formField}
          updateFieldValue={updateFieldValue}
          onUserInteraction={onUserInteraction}
          changesetWebform={changesetWebform}
          dataTestFieldId={dataTestFieldId}
          labelId={formField.labelId}
          ariaLabelledBy={formField.ariaLabelledBy}
          ariaErrorMessage={formField.ariaErrorMessage}
          ariaDescribedBy={formField.ariaDescribedBy}
          onFormSubmit={onFormSubmit}
        />
      )}
    </ValidatingFieldWrapper>
  );
}
