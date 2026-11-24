'use client';

// BEGIN-SNIPPET input-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'inputExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'password',
      fieldType: 'input',
      inputType: 'password',
      fieldLabel: 'Password',
      placeholder: 'Enter your password here',
    },
  ],
};

export default function InputExampleTwo() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
