import React, { useRef } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * ResetFormButton
 *
 * Renders a "discard changes / reset form" button. Calls
 * `resetForm(changesetWebform)` on click.
 * Optionally renders an icon component before the button text when
 * `formSettings.resetFormButtonIcon` is provided.
 *
 * Props:
 *  - resetForm         {Function}  Handler — called with `changesetWebform`.
 *  - changesetWebform  {object}    Parent webform instance.
 *  - formSettings      {object}    Form-level settings object.
 */
export default function ResetFormButton({ resetForm, changesetWebform, formSettings }) {
  const IconComponent = formSettings?.resetFormButtonIcon?.componentClass;

  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useAttrsFromConfig(buttonRef, 'buttonElement,resetFormButton', changesetWebform);
  useAttrsFromConfig(iconRef, 'buttonIcon,resetFormButtonIcon', changesetWebform);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-test-id="cwf-discard-changes-button"
      onClick={() => resetForm?.(changesetWebform)}
    >
      {IconComponent && (
        <span ref={iconRef}>
          <IconComponent
            props={formSettings.resetFormButtonIcon.props}
            changesetWebform={changesetWebform}
          />
        </span>
      )}
      {formSettings?.resetFormButtonText}
    </button>
  );
}
