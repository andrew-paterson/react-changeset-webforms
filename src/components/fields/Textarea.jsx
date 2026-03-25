import { useCallback } from 'react';

export default function Textarea({ formField, changesetWebform, updateFieldValue, onUserInteraction, onFormSubmit, ...rest }) {
  const onChange = useCallback(
    (event) => {
      updateFieldValue(event.target.value);
    },
    [updateFieldValue],
  );

  const handleUserInteraction = useCallback(
    (eventName, event) => {
      let value = event.target.value;
      onUserInteraction(eventName, value, event);
      if (eventName === 'keyUp') {
        updateFieldValue(value);
      } else if (eventName === 'focusOut') {
        formField.focussed = false;
        if (value && formField.trim && typeof value === 'string') {
          value = value.trim();
        }
      } else if (eventName === 'focusIn') {
        formField.focussed = true;
      }
    },
    [formField, updateFieldValue, onUserInteraction],
  );

  return (
    <textarea
      value={formField.fieldValue ?? ''}
      data-set-custom-validity
      onKeyUp={(e) => handleUserInteraction('keyUp', e)}
      onKeyDown={(e) => handleUserInteraction('keyDown', e)}
      onBlur={(e) => handleUserInteraction('focusOut', e)}
      onFocus={(e) => handleUserInteraction('focusIn', e)}
      onChange={onChange}
      placeholder={formField.placeholder}
      readOnly={formField.readonly}
      disabled={formField.disabled}
      name={formField.name}
      id={formField.id}
      aria-labelledby={formField.ariaLabelledBy}
      aria-label={formField.ariaLabel}
      aria-errormessage={formField.ariaErrorMessage}
      aria-describedby={formField.ariaDescribedBy}
      required={formField.required}
      {...rest}
    />
  );
}
