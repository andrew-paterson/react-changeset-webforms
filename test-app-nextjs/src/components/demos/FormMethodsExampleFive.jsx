'use client';

// BEGIN-SNIPPET form-methods-example-five.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods5',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
      ],
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Email',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
      ],
    },
  ],
};

export default function FormMethodsExampleFive() {
  const [data, setData] = React.useState(null);

  async function onFieldValueChange(_formField, changesetWebform) {
    setData(await changesetWebform.getData());
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <ul>
          <li>Name: {data?.name}</li>
          <li>Email: {data?.email}</li>
        </ul>
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        onFieldValueChange={onFieldValueChange}
      />
    </>
  );
}
// END-SNIPPET
