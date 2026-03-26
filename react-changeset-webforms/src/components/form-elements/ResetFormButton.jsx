import React from 'react';

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

  return (
    <button
      type="button"
      data-test-id="cwf-discard-changes-button"
      onClick={() => resetForm?.(changesetWebform)}
    >
      {IconComponent && (
        <IconComponent
          props={formSettings.resetFormButtonIcon.props}
          changesetWebform={changesetWebform}
        />
      )}
      {formSettings?.resetFormButtonText}
    </button>
  );
}
