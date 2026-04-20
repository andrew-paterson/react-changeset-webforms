'use client';

// BEGIN-SNIPPET custom-field-component.jsx
// components/custom-fields/PhoneNumberWithCountryCode.jsx
const COUNTRY_CODES = [
  { name: 'Afghanistan', code: '93' },
  { name: 'Albania', code: '355' },
  { name: 'Algeria', code: '213' },
  { name: 'American Samoa', code: '1-684' },
  { name: 'Andorra', code: '376' },
  { name: 'Angola', code: '244' },
  { name: 'Anguilla', code: '1-264' },
  { name: 'Antarctica', code: '672' },
  { name: 'Antigua and Barbuda', code: '1-268' },
];

function parseFieldValue(fieldValue) {
  if (!fieldValue) return { countryCode: '', phoneNumber: '' };
  const parts = fieldValue.split(')');
  return {
    countryCode: parts[0].replace('(', ''),
    phoneNumber: parts[1] ?? '',
  };
}

function buildFieldValue(countryCode, phoneNumber) {
  return `(${countryCode || ''})${phoneNumber || ''}`;
}

export default function PhoneNumberWithCountryCode({
  formField,
  updateFieldValue,
  onUserInteraction,
  ariaLabelledBy,
  ariaLabel,
  ariaErrorMessage,
  ariaDescribedBy,
}) {
  const fieldValueObject = parseFieldValue(formField.fieldValue);

  function handleCodeChange(event) {
    const updatedValue = buildFieldValue(
      event.target.value,
      fieldValueObject.phoneNumber,
    );
    onUserInteraction('countryCodeSelected');
    updateFieldValue(updatedValue);
  }

  function handleInputKeyUp(event) {
    const updatedValue = buildFieldValue(
      fieldValueObject.countryCode,
      event.target.value,
    );
    onUserInteraction('keyUpPhoneNumberInput');
    updateFieldValue(updatedValue);
  }

  function handleInputChange(event) {
    const updatedValue = buildFieldValue(
      fieldValueObject.countryCode,
      event.target.value,
    );
    updateFieldValue(updatedValue);
  }

  function handleFocusIn() {
    formField.focussed = true;
  }

  function handleFocusOut() {
    formField.focussed = false;
    onUserInteraction('focusOutPhoneNumberInput');
  }

  return (
    <div className="input-group padding-0 d-flex">
      <select
        className="form-select flex-shrink-1"
        value={fieldValueObject.countryCode}
        onChange={handleCodeChange}
        disabled={formField.disabled}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        aria-errormessage={ariaErrorMessage}
        aria-describedby={ariaDescribedBy}
      >
        <option value="" disabled>
          Country code
        </option>
        {COUNTRY_CODES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.code} - {option.name}
          </option>
        ))}
      </select>
      <input
        id={formField.id}
        className=" flex-grow-1"
        type="text"
        value={fieldValueObject.phoneNumber}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        readOnly={formField.readonly}
        disabled={formField.disabled}
        required={formField.required}
        name={`${formField.name}-phone-number-input`}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        aria-errormessage={ariaErrorMessage}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
}
// END-SNIPPET
