'use client';

// BEGIN-SNIPPET field-settings-overridden-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'signIn',
    submitButtonText: 'Sign in',
  },
  fieldSettings: {
    hideLabel: true,
  },
  fields: [
    {
      fieldId: 'firstName',
      fieldLabel: 'First name',
      fieldType: 'input',
    },
    {
      fieldId: 'lastName',
      fieldLabel: 'Last name',
      fieldType: 'input',
    },
    {
      fieldId: 'email',
      fieldLabel: 'Email',
      fieldType: 'input',
      inputType: 'email',
      hideLabel: false,
    },
  ],
};

export default function FieldSettingsOverriddenOne() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
