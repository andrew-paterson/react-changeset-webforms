import React from 'react';

/**
 * FieldDescription
 *
 * Renders the field description text in a div when `formField.fieldDescription`
 * is present. The id follows the `{formField.id}-description` convention so
 * it can be referenced by `aria-describedby`.
 *
 * Props:
 *  - formField          {object}  The field model object.
 *  - ...rest                      Spread onto the wrapper div.
 */
export default function FieldDescription({ formField, ...rest }) {
  if (!formField?.fieldDescription) {
    return null;
  }

  return (
    <div
      id={`${formField.id}-description`}
      data-test-class="cwf-field-description"
      {...rest}
    >
      {formField.fieldDescription}
    </div>
  );
}
