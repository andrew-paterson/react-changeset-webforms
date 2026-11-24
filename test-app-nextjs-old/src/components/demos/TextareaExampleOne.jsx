'use client';

// BEGIN-SNIPPET textarea-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'textareaExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'description',
      fieldType: 'textarea',
      fieldLabel: 'Description',
      placeholder: 'Enter your description here',
    },
  ],
};

export default function TextareaExampleOne() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
