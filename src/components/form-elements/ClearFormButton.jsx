import React from 'react';

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

  return (
    <button
      type="button"
      data-test-id="cwf-clear-form-button"
      onClick={() => clearForm?.(changesetWebform)}
    >
      {IconComponent && (
        <IconComponent
          props={formSettings.clearFormButtonIcon.props}
          changesetWebform={changesetWebform}
        />
      )}
      {formSettings?.clearFormButtonText}
    </button>
  );
}
