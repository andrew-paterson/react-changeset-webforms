'use client';

// BEGIN-SNIPPET form-methods-example-nine.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'formMethods9',
    resetFormButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      defaultValue: 'Steve Holt',
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
      defaultValue: 'steveholt@bluthcompany.com',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
    },
  ],
};

export default function FormMethodsExampleNine() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
