// BEGIN-SNIPPET field-methods-example-six.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'fieldMethods6',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      defaultValue: 'Default Name',
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

export default function FieldMethodsExampleSix() {
  const nameFieldRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.fields.find((field) => field.fieldId === 'name');
  }

  function resetNameField() {
    nameFieldRef.current.reset();
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">These buttons are outside of the ChangesetWebform component</b>
        <div className="d-flex mt-2">
          <button
            data-test-id="reset-name-field"
            className="btn btn-primary me-2"
            type="button"
            onClick={resetNameField}
          >
            Reset name field
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
