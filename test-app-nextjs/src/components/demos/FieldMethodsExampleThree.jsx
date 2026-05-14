'use client';

// BEGIN-SNIPPET field-methods-example-three.jsx
import { useRef, useReducer } from 'react';

import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'fieldMethods3',
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

export default function FieldMethodsExampleThree() {
  const nameFieldRef = useRef(null);
  const [_, forceUpdate] = useReducer((n) => n + 1, 0);
  function afterGenerateChangesetWebform(changesetWebform) {
    nameFieldRef.current = changesetWebform.fields.find(
      (field) => field.fieldId === 'name',
    );
  }

  function toggleOmission() {
    nameFieldRef.current.setOmission(!nameFieldRef.current.isOmitted);
    forceUpdate();
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">
          These buttons are outside of the ChangesetWebform component
        </b>
        <div className="d-flex mt-2">
          <button
            data-test-id="toggle-name-field"
            className="btn btn-primary me-2"
            type="button"
            onClick={toggleOmission}
          >
            Toggle field
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
