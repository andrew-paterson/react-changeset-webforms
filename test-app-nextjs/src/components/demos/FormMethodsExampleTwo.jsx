'use client';

// BEGIN-SNIPPET form-methods-example-two.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods2',
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
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
          validationMethod: 'validateFormat',
          arguments: {
            type: 'email',
          },
        },
      ],
    },
  ],
};

export default function FormMethodsExampleTwo() {
  const changesetWebformRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    changesetWebformRef.current = changesetWebform;
  }

  async function externalValidation() {
    const emailField = changesetWebformRef.current.fields.find((field) => field.fieldId === 'email');
    emailField.updateValue('steveholt@bluthcompany.com');
    await changesetWebformRef.current.validate({ skipUnvalidated: true });
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
            Update email and validate externally
          </button>
        </div>
      </div>
      <ChangesetWebform
        formSchema={formSchema}
        data={{ email: 'not-a-valid-email' }}
        afterGenerateChangesetWebform={afterGenerateChangesetWebform}
      />
    </>
  );
}
// END-SNIPPET
