import React from 'react';

/**
 * FieldErrors
 *
 * Renders a list of validation error messages when the field is invalid and
 * there is at least one error in `validationErrorsArray`.
 *
 * Props:
 *  - formField               {object}    The field model object.
 *  - validationErrorsArray   {string[]}  Array of error message strings.
 */
export default function FieldErrors({ formField, validationErrorsArray }) {
  if (
    formField?.validationStatus !== 'invalid' ||
    !validationErrorsArray?.length
  ) {
    return null;
  }

  return (
    <div
      id={`${formField.id}-errors`}
      role="alert"
      data-test-class="cwf-field-errors"
    >
      {validationErrorsArray.map((error, index) => (
        <div key={index} data-test-class="cwf-field-error">
          {error}
        </div>
      ))}
    </div>
  );
}
