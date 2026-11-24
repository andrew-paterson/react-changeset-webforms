'use client';

// BEGIN-SNIPPET forgot-password-form.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'forgotPasswordForm',
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
    },
  ],
};

export default function CustomSubmitActionPromise() {
  function submitData(_changesetData, changesetWebform) {
    return changesetWebform.changeset.save().then((response) => {
      return fetch(
        '/forgot-password' +
          '?email=' +
          encodeURIComponent(response.data.email),
      );
    });
  }

  function submitSuccess(_submitActionResponse, _changesetWebform) {
    alert('Success');
  }

  function submitError(_error, _changesetWebform) {
    alert('Fail');
  }

  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submitData}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
}
// END-SNIPPET
