// BEGIN-SNIPPET field-methods-example-two.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'fieldMethods2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name (Min 3 chars)',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
        {
          validationMethod: 'validateLength',
          arguments: {
            min: 3,
            // max: 3,
          },
        },
      ],
    },
  ],
};

export default function FieldMethodsExampleTwo() {
  const nameFieldRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.fields.find((field) => field.fieldId === 'name');
  }

  async function externalValidation() {
    nameFieldRef.current.updateValue('New Name');
    await nameFieldRef.current.validate({ skipUnvalidated: true });
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
