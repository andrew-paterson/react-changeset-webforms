'use client';

// BEGIN-SNIPPET forcing-validation.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'forcingValidation',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
      ],
    },
  ],
};

export default function ForcingValidation() {
  const nameFieldRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.fields.find((field) => field.fieldId === 'name');
  }

  function updateNameField() {
    nameFieldRef.current.eventLog.push('forceValidation');
    nameFieldRef.current.updateValue('New Name');
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">These buttons are outside of the ChangesetWebform component</b>
        <div className="d-flex mt-2">
          <button
            data-test-id="update-name-field"
            className="btn btn-primary me-2"
            type="button"
            onClick={updateNameField}
          >
            Update value of name field
          </button>
        </div>
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        afterGenerateChangesetWebform={afterGenerateChangesetWebform}
      />
    </>
  );
}
// END-SNIPPET
