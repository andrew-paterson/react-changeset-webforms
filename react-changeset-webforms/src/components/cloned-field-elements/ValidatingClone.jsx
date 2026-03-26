import React, { useCallback, useEffect, useRef } from 'react';
import ValidatingFieldWrapper from '../field-elements/ValidatingFieldWrapper.jsx';

/**
 * ValidatingClone
 *
 * Renders a single clone field inside a ValidatingFieldWrapper.
 * Mirrors the Ember ValidatingClone component, including:
 *  - Lifecycle: pushes insert events to both the clone and master eventLogs
 *    on mount, and queries DOM for custom-validity elements.
 *  - onUserInteractionClone: proxies user interaction events from the clone
 *    control up through the master field's eventLog.
 *  - updateCloneValue: splices the new value into the group array at the
 *    clone's index before calling the parent updateFieldValue.
 *
 * Props:
 *  - clonedFormField   {object}    The individual clone field model.
 *  - masterFormField   {object}    The master (parent) field model.
 *  - changesetWebform  {object}    Parent webform instance.
 *  - cloneField        {Function}  Add-a-clone handler.
 *  - removeClone       {Function}  Remove-a-clone handler.
 *  - onUserInteraction {Function}  Parent interaction callback.
 *  - updateFieldValue  {Function}  Parent value-update callback.
 *  - validateField     {Function}  Validate the master field.
 *  - groupValue        {any[]}     Current value array for the clone group.
 */
export default function ValidatingClone({ clonedFormField, masterFormField, changesetWebform, cloneField, removeClone, onUserInteraction, updateFieldValue, validateField, groupValue }) {
  const wrapperRef = useRef(null);

  // Equivalent of {{did-insert}}
  const didInsert = useCallback(
    (element) => {
      if (!element) return;
      clonedFormField.eventLog.push('insert');
      masterFormField.eventLog.push('insertClone');
      if (clonedFormField.fieldValue) {
        clonedFormField.eventLog.push('insertWithValue');
        masterFormField.eventLog.push('insertWithValueClone');
      }
      clonedFormField.updateValidationActivation?.();
      setTimeout(() => {
        clonedFormField.customValidityEls = element.querySelectorAll('[data-set-custom-validity]');
        validateField?.(masterFormField);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clonedFormField, masterFormField],
  );

  // Run didInsert once the wrapper DOM node is available via callback ref
  const callbackRef = useCallback(
    (node) => {
      if (node) {
        wrapperRef.current = node;
        didInsert(node);
      }
    },
    [didInsert],
  );

  const onUserInteractionClone = useCallback(
    (eventName) => {
      if (eventName === 'focusOut') {
        clonedFormField.focussed = false;
      } else if (eventName === 'focusIn') {
        clonedFormField.focussed = true;
      }
      clonedFormField.eventLog.push(eventName);
      masterFormField.eventLog.push(`${eventName}Clone`);
      clonedFormField.updateValidationActivation?.();
      onUserInteraction?.(`${eventName}Clone`);
    },
    [clonedFormField, masterFormField, onUserInteraction],
  );

  const updatedGroupValue = useCallback(
    (value, index) => {
      const currentGroupValue = changesetWebform?.changeset?.get(masterFormField.propertyName) || [];

      // Avoid a no-op update (see original comment about hasMany relationships)
      if (currentGroupValue[index] === value) {
        return currentGroupValue;
      }

      masterFormField.lastUpdatedClone = {
        index,
        previousValue: currentGroupValue[index],
        previousLength: currentGroupValue.length,
      };

      currentGroupValue[index] = value;
      return currentGroupValue;
    },
    [changesetWebform, masterFormField],
  );

  const updateCloneValue = useCallback(
    (value) => {
      clonedFormField.eventLog.push('valueUpdated');
      masterFormField.eventLog.push('valueUpdatedClone');
      clonedFormField.updateValidationActivation?.();
      updateFieldValue?.(updatedGroupValue(value, clonedFormField.index), masterFormField);
    },
    [clonedFormField, masterFormField, updateFieldValue, updatedGroupValue],
  );

  const FieldComponent = clonedFormField?.componentClass;
  console.log('FieldComponent', FieldComponent);
  return (
    <ValidatingFieldWrapper
      ref={callbackRef}
      formField={clonedFormField}
      masterFormField={masterFormField}
      removeClone={removeClone}
      changesetWebform={changesetWebform}
      validationErrorsArray={clonedFormField?.cloneValidationErrors}
      labelId={clonedFormField?.labelId}
      data-test-class={`${masterFormField?.id}-clone`}
      data-test-id={clonedFormField?.id}
    >
      {FieldComponent && (
        <FieldComponent
          formField={clonedFormField}
          clonedFormField={clonedFormField}
          masterFormField={masterFormField}
          onUserInteraction={onUserInteractionClone}
          updateFieldValue={updateCloneValue}
          cloneField={cloneField}
          removeClone={removeClone}
          changesetWebform={changesetWebform}
          labelId={clonedFormField?.labelId}
        />
      )}
    </ValidatingFieldWrapper>
  );
}
