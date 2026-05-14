'use client';
// BEGIN-SNIPPET select-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms';
import { useState } from 'react';

const formSchema = {
  formSettings: {
    formName: 'selectExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'country',
      allowClear: true,
      fieldType: 'select',
      fieldLabel: 'Country',
      placeholder: 'Select a country',
      options: ['South Africa', 'United Kingdom', 'United States', 'Germany'],
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
          <>The selected country is {country}</>
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
