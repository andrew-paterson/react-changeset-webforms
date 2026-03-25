import React from 'react';

/**
 * AddCloneButton
 *
 * Renders the "add clone" button for a clone-group field. Calls
 * `onClickAddCloneButton(formField.cloneGroupName)` on click.
 *
 * Button text falls back to `"New {fieldLabel} field"` when no
 * `formField.cloneButtonText` is set.
 *
 * Optionally renders an icon component before the text when
 * `changesetWebform.formSettings.addCloneButtonIconComponent` is provided.
 *
 * Props:
 *  - onClickAddCloneButton  {Function}  Handler — called with `formField.cloneGroupName`.
 *  - formField              {object}    The master field model.
 *  - changesetWebform       {object}    Parent webform instance.
 */
export default function AddCloneButton({ onClickAddCloneButton, formField, changesetWebform }) {
  const iconConfig = changesetWebform?.formSettings?.addCloneButtonIconComponent;
  const IconComponent = iconConfig?.componentClass;

  const buttonText = formField?.cloneButtonText || `New ${formField?.fieldLabel} field`;

  return (
    <button
      type="button"
      data-test-id="cwf-add-clone-button"
      onClick={() => onClickAddCloneButton?.(formField?.cloneGroupName)}
    >
      {IconComponent && (
        <IconComponent
          props={iconConfig.props}
          changesetWebform={changesetWebform}
          formField={formField}
        />
      )}
      {buttonText}
    </button>
  );
}
