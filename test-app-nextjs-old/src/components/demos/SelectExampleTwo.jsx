'use client';
// BEGIN-SNIPPET select-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms';
import { useState } from 'react';

const formSchema = {
  formSettings: {
    formName: 'selectExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'country',
      fieldType: 'select',
      fieldLabel: 'Country',
      placeholder: 'Select a country',
      optionValueProp: 'value',
      optionDisplayProp: 'label',
      options: [
        { value: 'za', label: 'South Africa' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'us', label: 'United States' },
        { value: 'de', label: 'Germany' },
      ],
    },
  ],
};

function onUserInteraction(...args) {
  console.log(args);
}

export default function SelectExampleOne() {
  function onValueUpdate(formField, changesetWebform) {
    return updateCountry(formField.fieldValue);
  }
  const [country, updateCountry] = useState(null);
  return (
    <>
      <div data-test-id="selected-country-feedback">
        {country ? (
          <>The selected country code is {country}</>
        ) : (
          <>No country selected</>
        )}
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        onUserInteraction={onUserInteraction}
        onFieldValueChange={onValueUpdate}
      />
    </>
  );
}
// END-SNIPPET
