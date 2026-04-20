'use client';

// BEGIN-SNIPPET clear-after-submit-form-schema.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'clearAfterSubmitForm',
    clearFormAfterSubmit: true,
    submitButtonText: 'Create account',
    clearFormButton: true,
    resetFormButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      fieldLabel: 'email',
      defaultValue: 'test@email.com',
    },
  ],
};

function submit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export default function ClearAfterSubmitFormSchema() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submit}
    />
  );
}
// END-SNIPPET
