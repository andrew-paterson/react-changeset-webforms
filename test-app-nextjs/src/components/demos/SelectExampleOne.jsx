'use client';
// BEGIN-SNIPPET select-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import { useState } from 'react';

const formSchema = {
  formSettings: {
    formName: 'selectExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'country',
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
      {country ? (
        <div>The selected country is {country}</div>
      ) : (
        <div>No country selected</div>
      )}
      <ChangesetWebform
        formSchema={formSchema}
        onUserInteraction={onUserInteraction}
        onFieldValueChange={onValueUpdate}
      />
    </>
  );
}
// END-SNIPPET
