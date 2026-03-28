// BEGIN-SNIPPET field-methods-example-seven.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'fieldMethods7',
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

export default function FieldMethodsExampleSeven() {
  const nameFieldRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.getField('name');
  }

  function pushErrors() {
    nameFieldRef.current.pushErrors(['This is a custom error message']);
  }

  function updateErrorMessage(event) {
    nameFieldRef.current.pushErrors([event.target.value]);
    document.querySelector('[data-test-id="error-message-input"]').value = '';
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">This input is outside of the ChangesetWebform component</b>
        <div className="d-flex mt-2">
          <input
            type="text"
            placeholder="Error message"
            className="form-control me-2"
            style={{ maxWidth: '300px' }}
            data-test-id="error-message-input"
            onChange={updateErrorMessage}
          />
          <button
            className="btn btn-primary me-2"
            type="button"
            onClick={pushErrors}
          >
            Push error to name field
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
