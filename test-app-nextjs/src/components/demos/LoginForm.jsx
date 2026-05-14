'use client';

// BEGIN-SNIPPET login-form.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'login',
    submitButtonText: 'Log in',
    hideLabels: true,
    clearFormAfterSubmit: true,
  },
  fields: [
    {
      fieldId: 'email',
      fieldLabel: 'Email',
      fieldType: 'input',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
      inputType: 'text',
      class: 'email',
    },
    {
      fieldId: 'password',
      fieldLabel: 'Password',
      fieldType: 'input',
      hideLabel: true,
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
      inputType: 'password',
      class: 'password',
    },
  ],
};

function submit(_data, _changesetWebform) {
  // Action that runs when the user clicks submit.
  return;
}

function submitSuccess(_response, _changesetWebform) {
  // Action that runs after a success response from the submit action above.
  alert('Success!');
}

function submitError(_error, _changesetWebform) {
  // Action that runs after an error response from the submit action above.
  alert('Error!');
}

export default function LoginForm() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submit}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
}
// END-SNIPPET
