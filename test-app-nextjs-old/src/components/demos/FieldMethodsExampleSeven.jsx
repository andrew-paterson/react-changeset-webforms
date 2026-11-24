'use client';

// BEGIN-SNIPPET field-methods-example-seven.jsx
import { useRef, useReducer } from 'react';
import ChangesetWebform from 'react-changeset-webforms';

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
  const nameFieldRef = useRef(null);
  const [_, forceUpdate] = useReducer((n) => n + 1, 0);
  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.getField('name');
  }

  function pushErrors() {
    nameFieldRef.current.pushErrors(['This is a custom error message']);
    forceUpdate();
  }

  function updateErrorMessage(event) {
    nameFieldRef.current.pushErrors([event.target.value]);
    document.querySelector('[data-test-id="error-message-input"]').value = '';
    forceUpdate();
  }

  function handleErrorMessageKeyDown(event) {
    if (event.key === 'Enter') {
      updateErrorMessage(event);
    }
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">
          This input is outside of the ChangesetWebform component
        </b>
        <div className="d-flex mt-2">
          <input
            type="text"
            placeholder="Error message"
            className="form-control me-2"
            style={{ maxWidth: '300px' }}
            data-test-id="error-message-input"
            onBlur={updateErrorMessage}
            onKeyDown={handleErrorMessageKeyDown}
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
