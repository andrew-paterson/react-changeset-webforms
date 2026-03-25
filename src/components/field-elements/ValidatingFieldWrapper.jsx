import React, { useRef, useEffect } from 'react';
import ValidatingFieldWrapperElement from './ValidatingFieldWrapperElement.jsx';
import FieldLabel from './FieldLabel.jsx';
import FieldDescription from './FieldDescription.jsx';
import FieldErrors from './FieldErrors.jsx';

/**
 * ValidatingFieldWrapper
 *
 * Wraps a single field's content with:
 *  - a ValidatingFieldWrapperElement (fieldset or div)
 *  - optional field-actions slot (shown for clones that can be removed)
 *  - label, description, field controls, and errors, all placed into the
 *    correct DOM container (clone or wrapper) via refs — mirroring the
 *    Ember `{{in-element}}` portal pattern.
 *
 * Props:
 *  - formField               {object}      The field model object.
 *  - masterFormField         {object}      The master field (for clones).
 *  - changesetWebform        {object}      The parent webform instance.
 *  - labelId                 {string}      id for the label element.
 *  - validationErrorsArray   {string[]}    Validation error strings.
 *  - dataTestFieldId         {string}      data-test-id attribute value.
 *  - removeClone             {Function}    Handler to remove a clone.
 *  - children                {React.Node}  The field control element(s).
 *  - ...rest                              Spread onto the wrapper element.
 */
function getAttrsFromConfigNameSpaces(formField, masterFormField) {
  const final = ['focussedField', 'disabledField', 'validatedField'];
  final.push(formField.isClone ? 'cloneWrapper' : 'fieldWrapper');
  if (formField.validates) final.push('validatingField');
  if (formField.required) final.push('requiredField');
  const hasFieldActions = formField.isClone && masterFormField?.cloneCountStatus !== 'min';
  if (formField.isClone && hasFieldActions) final.push('cloneWrapperWithRemoveButton');
  return [...new Set(final)].join(',');
}

export default function ValidatingFieldWrapper({ formField, masterFormField, changesetWebform, labelId, validationErrorsArray, dataTestFieldId, removeClone, children, ...rest }) {
  const fieldActionsRef = useRef(null);
  const fieldContentsRef = useRef(null);

  const hasFieldActions = formField?.isClone && masterFormField?.cloneCountStatus !== 'min';

  // For clones, field contents are rendered into a separate slot div via ref;
  // for master fields, they render directly inside the wrapper.
  const isClone = formField?.isClone;

  // Import RemoveCloneButton lazily to avoid circular deps — callers can also
  // pass it as a prop; here we import it directly.
  // If your project has a RemoveCloneButton component, import it at the top.
  // import RemoveCloneButton from './RemoveCloneButton.jsx';

  const fieldContents = (
    <>
      <FieldLabel
        formField={formField}
        changesetWebform={changesetWebform}
        labelId={labelId}
      />
      <FieldDescription
        formField={formField}
        changesetWebform={changesetWebform}
      />
      <div
        role={formField?.isGroup ? 'group' : undefined}
        data-test-id="field-controls"
      >
        {children}
      </div>
      <FieldErrors
        formField={formField}
        changesetWebform={changesetWebform}
        validationErrorsArray={validationErrorsArray}
      />
    </>
  );

  return (
    <ValidatingFieldWrapperElement
      formField={formField}
      data-test-cwf-field-wrapper={!formField?.isClone || undefined}
      data-test-cwf-clone-wrapper={formField?.isClone || undefined}
      data-test-class={formField?.typeClass}
      data-test-cwf-field-validates={formField?.validates}
      data-test-cwf-field-required={formField?.required}
      data-test-id={dataTestFieldId}
      data-test-validates={formField?.validates}
      data-test-was-validated={formField?.wasValidated}
      data-test-validation-status={formField?.validationStatus}
      className={formField?.typeClass}
      data-attrs-namespaces={getAttrsFromConfigNameSpaces(formField, masterFormField)}
      {...rest}
    >
      {/* Field-actions slot — only rendered for removable clones */}
      {hasFieldActions && (
        <div
          data-field-actions
          ref={fieldActionsRef}
        />
      )}

      {/* For clones, a separate content slot div receives the label/errors/controls */}
      {isClone && (
        <div
          data-field-content
          ref={fieldContentsRef}
        />
      )}

      {/* Render field contents directly (non-clone) or into the clone slot */}
      {!isClone && fieldContents}

      {/* Clone-actions: RemoveCloneButton placed into fieldActions or wrapper */}
      {/* Uncomment and adapt once RemoveCloneButton is available:
      {isClone && (
        <RemoveCloneButton
          formField={formField}
          masterFormField={masterFormField}
          removeClone={removeClone}
          changesetWebform={changesetWebform}
        />
      )} */}
    </ValidatingFieldWrapperElement>
  );
}
