'use client';

// BEGIN-SNIPPET clone-group-form-no-field-label.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'addEmails',
    submitButtonText: 'Submit',
    clearFormAfterSubmit: true,
  },
  fields: [
    {
      fieldId: 'emails',
      fieldLabel: 'User emails',
      fieldType: 'clone-group',
      cloneButtonText: 'Add email address',
      cloneFieldSchema: {
        fieldType: 'input',
        inputType: 'email',
      },
    },
  ],
};

export default function CloneGroupFormNoFieldLabel() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
