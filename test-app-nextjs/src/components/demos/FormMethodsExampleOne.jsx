'use client';

// BEGIN-SNIPPET form-methods-example-one.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods1',
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

export default function FormMethodsExampleOne() {
  const changesetWebformRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    changesetWebformRef.current = changesetWebform;
  }

  async function externalValidation() {
    await changesetWebformRef.current.validate();
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">These buttons are outside of the ChangesetWebform component</b>
        <div className="d-flex mt-2">
          <button
            data-test-id="validate-externally"
            className="btn btn-primary me-2"
            type="button"
            onClick={externalValidation}
          >
            Validate externally
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
