import React, { useRef } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * RemoveCloneButton
 *
 * Renders a "remove clone" button only when:
 *  - the field is a clone (`formField.isClone`)
 *  - AND the master field's clone count is not at the minimum
 *    (`masterFormField.cloneCountStatus !== 'min'`)
 *
 * Renders `masterFormField.removeCloneComponent.componentClass` as the button
 * icon/content.
 *
 * Props:
 *  - formField         {object}    The individual clone field model.
 *  - masterFormField   {object}    The master (parent) field model.
 *  - removeClone       {Function}  Handler — called with `formField`.
 *  - props             {object}    Passed through to the icon component.
 *  - changesetWebform  {object}    Parent webform instance.
 */
export default function RemoveCloneButton({ formField, masterFormField, removeClone, props, changesetWebform }) {
  const shouldRender = formField?.isClone && masterFormField?.cloneCountStatus !== 'min';

  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useAttrsFromConfig(buttonRef, 'removeCloneButton', changesetWebform, formField);
  useAttrsFromConfig(iconRef, 'removeCloneButtonIcon', changesetWebform, formField);

  if (!shouldRender) {
    return null;
  }

  const IconComponent = masterFormField?.removeCloneComponent?.componentClass;

  return (
    <button
      ref={buttonRef}
      type="button"
      data-test-class="cwf-remove-clone-button"
      title={`Remove ${formField?.fieldId}`}
      onClick={() => removeClone?.(formField)}
    >
      {IconComponent && (
        <span ref={iconRef}>
          <IconComponent
            props={props}
            changesetWebform={changesetWebform}
            formField={masterFormField}
            formFieldClone={formField}
          />
        </span>
      )}
    </button>
  );
}
