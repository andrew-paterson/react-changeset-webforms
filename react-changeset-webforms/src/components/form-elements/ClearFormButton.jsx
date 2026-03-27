import React, { useRef } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * ClearFormButton
 *
 * Renders a "clear form" button. Calls `clearForm(changesetWebform)` on click.
 * Optionally renders an icon component before the button text when
 * `formSettings.clearFormButtonIcon` is provided.
 *
 * Props:
 *  - clearForm         {Function}  Handler — called with `changesetWebform`.
 *  - changesetWebform  {object}    Parent webform instance.
 *  - formSettings      {object}    Form-level settings object.
 */
export default function ClearFormButton({ clearForm, changesetWebform, formSettings }) {
  const IconComponent = formSettings?.clearFormButtonIcon?.componentClass;

  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useAttrsFromConfig(buttonRef, 'buttonElement,clearFormButton', changesetWebform);
  useAttrsFromConfig(iconRef, 'buttonIcon,clearFormButtonIcon', changesetWebform);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-test-id="cwf-clear-form-button"
      onClick={() => clearForm?.(changesetWebform)}
    >
      {IconComponent && (
        <span ref={iconRef}>
          <IconComponent
            props={formSettings.clearFormButtonIcon.props}
            changesetWebform={changesetWebform}
          />
        </span>
      )}
      {formSettings?.clearFormButtonText}
    </button>
  );
}
