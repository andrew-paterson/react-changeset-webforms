'use client';

// BEGIN-SNIPPET form-methods-example-ten.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'formMethods10',
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
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Email',
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

export default function FormMethodsExampleTen() {
  const [nextStepEnabled, setNextStepEnabled] = React.useState(false);

  function updateNextStepEnabled(changesetWebform) {
    setNextStepEnabled(!changesetWebform.hasValidationErrors);
  }

  function afterGenerateChangesetWebform(changesetWebform) {
    updateNextStepEnabled(changesetWebform);
  }

  function afterFieldValidation(_formField, changesetWebform) {
    updateNextStepEnabled(changesetWebform);
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <div className="mt-2">
          {nextStepEnabled ? (
            <>
              <button
                data-test-id="next-step-enabled"
                className="btn btn-primary me-2"
                type="button"
              >
                Go to next step
              </button>
              <div
                className="alert alert-success mb-0"
                data-test-id="alert-success"
              >
                No fields have failed validation.
              </div>
            </>
          ) : (
            <>
              <button
                data-test-id="next-step-disabled"
                className="btn btn-gray me-2"
                type="button"
                disabled
              >
                Next step disabled
              </button>
              <div
                className="alert alert-danger mb-0"
                data-test-id="alert-danger"
              >
                One or more validating fields has failed validation.
              </div>
            </>
          )}
        </div>
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        afterGenerateChangesetWebform={afterGenerateChangesetWebform}
        afterFieldValidation={afterFieldValidation}
      />
    </>
  );
}
// END-SNIPPET
