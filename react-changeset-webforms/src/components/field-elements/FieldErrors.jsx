import React, { useRef, useEffect } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import { classNamesFromConfig, mergedAttrFunctions } from 'validated-changeset-webforms';

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
export default function FieldErrors({ formField, validationErrorsArray, changesetWebform }) {
  const errorsWrapperRef = useRef(null);
  const errorItemRefs = useRef([]);

  useAttrsFromConfig(errorsWrapperRef, 'validationErrors', changesetWebform, formField);
  useEffect(() => {
    errorItemRefs.current.forEach((el) => {
      if (!el || !changesetWebform) return;
      const classNames = classNamesFromConfig('validationError', changesetWebform, formField, el);
      el.classList.remove(...classNames.filter((c) => c.startsWith('!')).map((c) => c.slice(1)));
      el.classList.add(...classNames.filter((c) => !c.startsWith('!')));
      const attrFunctions = mergedAttrFunctions('validationError', changesetWebform, formField);
      if (typeof attrFunctions['validationError'] === 'function') {
        attrFunctions['validationError'](el, changesetWebform, formField);
      }
    });
  }, [changesetWebform, formField, validationErrorsArray]);

  if (formField?.validationStatus !== 'invalid' || !validationErrorsArray?.length) {
    return null;
  }

  return (
    <div
      ref={errorsWrapperRef}
      id={`${formField.id}-errors`}
      role="alert"
      data-test-class="cwf-field-errors"
    >
      {validationErrorsArray.map((error, index) => (
        <div
          key={index}
          ref={(el) => {
            errorItemRefs.current[index] = el;
          }}
          data-test-class="cwf-field-error"
        >
          {error}
        </div>
      ))}
    </div>
  );
}
