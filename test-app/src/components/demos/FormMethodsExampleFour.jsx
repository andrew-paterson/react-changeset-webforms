// BEGIN-SNIPPET form-methods-example-four.jsx"
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods4',
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

export default function FormMethodsExampleFour() {
  const [nextStepEnabled, setNextStepEnabled] = React.useState(false);

  function afterFieldValidation(_formField, changesetWebform) {
    setNextStepEnabled(!changesetWebform.hasValidationErrors && !changesetWebform.hasUnvalidatedFields);
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
                All validating fields have successfully validated.
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
                One or more validating fields has either failed validation, or not yet been validated.
              </div>
            </>
          )}
        </div>
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        afterFieldValidation={afterFieldValidation}
      />
    </>
  );
}
// END-SNIPPET
