'use client';

// BEGIN-SNIPPET form-methods-example-six.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods6',
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
      defaultValue: 'taken@example.com',
      validationEvents: ['$inherited', 'insertWithValue'],
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

function submitData(data, changesetWebform) {
  if (data.email === 'taken@example.com') {
    changesetWebform.pushErrors({
      fieldId: 'email',
      errors: ['This email address is already taken. Please use another one.'],
    });
  }
}

export default function FormMethodsExampleSix() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submitData}
    />
  );
}
// END-SNIPPET
