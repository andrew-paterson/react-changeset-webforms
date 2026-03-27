import { useRef, forwardRef, useImperativeHandle } from 'react';
import ValidatingFieldWrapperElement from './ValidatingFieldWrapperElement.jsx';
import FieldLabel from './FieldLabel.jsx';
import FieldDescription from './FieldDescription.jsx';
import FieldErrors from './FieldErrors.jsx';
import RemoveCloneButton from '../cloned-field-elements/RemoveCloneButton.jsx';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * ValidatingFieldWrapper
 *
 * Wraps a single field (or clone) in the correct structure:
 *  - ValidatingFieldWrapperElement (fieldset or div) as the outer shell.
 *  - For clone fields: a `data-field-actions` slot div (for the remove button)
 *    followed by a `data-field-content` div containing the field internals.
 *  - For non-clone fields: the field internals rendered directly inside the shell.
 *
 * Field internals (label, description, controls, errors) are rendered in the
 * same place in both cases — the Ember version used {{in-element}} portals to
 * move them into slot divs, but in React we just render them directly where
 * they belong.
 *
 * The component accepts a `ref` (via forwardRef) so a parent can use a
 * callback ref for {{did-insert}} / {{will-destroy}} lifecycle equivalents.
 *
 * Props:
 *  - formField               {object}      The field model.
 *  - masterFormField         {object}      The master field (clone rows only).
 *  - changesetWebform        {object}      Parent webform instance.
 *  - children                {ReactNode}   The field control element(s).
 *  - dataTestFieldId         {string}      data-test-id on the wrapper element.
 *  - dataTestFormName        {string}      data-test-form-name attribute.
 *  - labelId                 {string}      id for the label element.
 *  - validationErrorsArray   {string[]}    Passed to FieldErrors.
 *  - removeClone             {Function}    Clone remove handler.
 *  - ...rest                               Spread onto ValidatingFieldWrapperElement.
 */
const ValidatingFieldWrapper = forwardRef(function ValidatingFieldWrapper({ formField, masterFormField, changesetWebform, children, dataTestFieldId, dataTestFormName, labelId, validationErrorsArray, removeClone, ...rest }, ref) {
  const wrapperElRef = useRef(null);
  const fieldControlsRef = useRef(null);

  // Merge the forwarded ref with our internal ref so the parent's callback ref
  // fires on the wrapper element while we can also query it internally.
  useImperativeHandle(ref, () => wrapperElRef.current, []);

  const hasFieldActions = formField?.isClone && masterFormField?.cloneCountStatus !== 'min';

  const attrsFromConfigNameSpaces = (() => {
    const ns = ['focussedField', 'disabledField', 'validatedField'];
    ns.push(formField?.isClone ? 'cloneWrapper' : 'fieldWrapper');
    if (formField?.validates) ns.push('validatingField');
    if (formField?.required) ns.push('requiredField');
    if (formField?.isClone && hasFieldActions) ns.push('cloneWrapperWithRemoveButton');
    return ns.filter((item, i, arr) => arr.indexOf(item) === i).join(',');
  })();

  const fieldControlsNameSpace = formField?.isClone ? 'cloneFieldControls' : 'fieldControls';

  useAttrsFromConfig(wrapperElRef, attrsFromConfigNameSpaces, changesetWebform, formField);
  useAttrsFromConfig(fieldControlsRef, fieldControlsNameSpace, changesetWebform, formField);

  const fieldInternals = (
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
        ref={fieldControlsRef}
        data-test-id="field-controls"
        role={formField?.isGroup ? 'group' : undefined}
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
      ref={wrapperElRef}
      formField={formField}
      data-test-cwf-field-wrapper={!formField?.isClone || undefined}
      data-test-cwf-clone-wrapper={formField?.isClone || undefined}
      data-test-class={formField?.typeClass}
      data-test-cwf-field-validates={formField?.validates}
      data-test-cwf-field-required={formField?.required}
      data-test-id={dataTestFieldId}
      data-test-form-name={dataTestFormName}
      data-test-validates={formField?.validates}
      data-test-was-validated={formField?.wasValidated}
      data-test-validation-status={formField?.validationStatus}
      className={formField?.typeClass}
      {...rest}
    >
      {/* Clone layout: actions slot + content slot */}
      {formField?.isClone ? (
        <>
          {hasFieldActions && (
            <div data-field-actions>
              <RemoveCloneButton
                formField={formField}
                masterFormField={masterFormField}
                removeClone={removeClone}
                changesetWebform={changesetWebform}
              />
            </div>
          )}
          <div data-field-content>{fieldInternals}</div>
        </>
      ) : (
        fieldInternals
      )}
    </ValidatingFieldWrapperElement>
  );
});

export default ValidatingFieldWrapper;
