'use client';

// BEGIN-SNIPPET custom-form-submission.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import { preFlightForm } from 'validated-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'customFormSubmission',
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
    },
  ],
};

export default function CustomFormSubmission() {
  const [alert, setAlert] = React.useState(null);

  async function onFormSubmit(changesetWebform) {
    await preFlightForm(changesetWebform);
    if (!changesetWebform.changeset.isValid) {
      return;
    }
    setAlert({
      type: 'success',
      message: 'A completely custom form submission action was run.',
    });
  }

  return (
    <>
      {alert && (
        <div
          data-test-id="custom-form-submission-alert"
          className={`alert alert-${alert.type}`}
        >
          {alert.message}
        </div>
      )}
      <ChangesetWebform
        formSchema={formSchema}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}
// END-SNIPPET
