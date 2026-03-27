import React, { useRef } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

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
export default function FieldDescription({ formField, changesetWebform, ...rest }) {
  const descriptionRef = useRef(null);
  useAttrsFromConfig(descriptionRef, 'fieldDescription', changesetWebform, formField);

  if (!formField?.fieldDescription) {
    return null;
  }

  return (
    <div
      ref={descriptionRef}
      id={`${formField.id}-description`}
      data-test-class="cwf-field-description"
      {...rest}
    >
      {formField.fieldDescription}
    </div>
  );
}
