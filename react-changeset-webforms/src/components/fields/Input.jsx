import { useCallback, useRef } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

export default function Input({ formField, changesetWebform, updateFieldValue, onUserInteraction, onFormSubmit, ...rest }) {
  const inputRef = useRef(null);

  useAttrsFromConfig(inputRef, 'inputElement,inputField', changesetWebform, formField);
  const onChange = useCallback(
    (event) => {
      updateFieldValue(event.target.value);
    },
    [updateFieldValue],
  );

  const handleUserInteraction = useCallback(
    (eventName, event) => {
      if (eventName === 'keyUp' && formField.fieldType === 'input' && event.keyCode === 13 && onFormSubmit) {
        formField.focussed = false;
        onFormSubmit(changesetWebform.changeset);
        return;
      }
      let value = event.target.value;
      onUserInteraction(eventName, value, event);
      if (eventName === 'keyUp') {
        updateFieldValue(value);
      } else if (eventName === 'focusOut') {
        formField.focussed = false;
        if (value && formField.trim && formField.inputType !== 'password' && typeof value === 'string') {
          value = value.trim();
        }
      } else if (eventName === 'focusIn') {
        formField.focussed = true;
      }
    },
    [formField, changesetWebform, updateFieldValue, onUserInteraction, onFormSubmit],
  );

  return (
    <input
      value={formField.fieldValue ?? ''}
      onKeyUp={(e) => handleUserInteraction('keyUp', e)}
      onKeyDown={(e) => handleUserInteraction('keyDown', e)}
      onBlur={(e) => handleUserInteraction('focusOut', e)}
      onFocus={(e) => handleUserInteraction('focusIn', e)}
      onChange={onChange}
      placeholder={formField.placeholder}
      type={formField.inputType}
      readOnly={formField.readonly}
      disabled={formField.disabled}
      name={formField.name}
      id={formField.id}
      aria-labelledby={formField.ariaLabelledBy}
      aria-label={formField.ariaLabel}
      aria-errormessage={formField.ariaErrorMessage}
      aria-describedby={formField.ariaDescribedBy}
      required={formField.required}
      ref={inputRef}
      {...filterHtmlProps(rest)}
    />
  );
}
