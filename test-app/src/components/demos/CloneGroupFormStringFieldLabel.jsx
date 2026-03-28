// BEGIN-SNIPPET clone-group-form-string-field-label.jsx
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
        fieldLabel: 'Email',
        placeholder: 'Enter email address',
        fieldType: 'input',
        inputType: 'email',
      },
    },
  ],
};

export default function CloneGroupFormStringFieldLabel() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
