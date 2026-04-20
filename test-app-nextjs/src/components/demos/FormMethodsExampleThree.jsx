'use client';

// BEGIN-SNIPPET form-methods-example-three.jsx
import { useRef, useReducer} from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formMethods3',
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

export default function FormMethodsExampleThree() {

  const changesetWebformRef = useRef(null);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  function afterGenerateChangesetWebform(changesetWebform) {
    changesetWebformRef.current = changesetWebform;
  }

  function toggleEmailField() {
    const emailField = changesetWebformRef.current.fields.find((field) => field.fieldId === 'email');
    changesetWebformRef.current.setFieldOmission('email', !emailField.isOmitted);
    forceUpdate();
  }

  return (
    <>
      <div className="border rounded p-2 mb-4 bg-light">
        <b className="mb-2">These buttons are outside of the ChangesetWebform component</b>
        <div className="d-flex mt-2">
          <button
            data-test-id="toggle-email-field"
            className="btn btn-primary me-2"
            type="button"
            onClick={toggleEmailField}
          >
            Toggle email field
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
