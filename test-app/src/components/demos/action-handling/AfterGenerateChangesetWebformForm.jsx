// BEGIN-SNIPPET after-generate-changeset-webform-form.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'nameAndEmail',
    hideSubmitButton: true,
    hideLabels: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldLabel: 'Name',
      fieldType: 'input',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
      inputType: 'text',
    },
    {
      fieldId: 'email',
      fieldLabel: 'Email',
      fieldType: 'input',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
      inputType: 'email',
    },
  ],
};

export default function AfterGenerateChangesetWebformForm() {
  const [step, setStep] = React.useState(1);
  const changesetWebformRef = React.useRef(null);

  function afterGenerateChangesetWebform(changesetWebform) {
    changesetWebformRef.current = changesetWebform;
  }

  function next() {
    const currentStep = step;
    changesetWebformRef.current.validate().then(() => {
      if (changesetWebformRef.current.changeset.isValid) {
        setStep(currentStep + 1);
      }
    });
  }

  function prev() {
    setStep((s) => s - 1);
  }

  return (
    <>
      {step === 2 ? (
        <div data-test-id="step-2">
          <h2>Step 2</h2>
          <div>Step 2 content</div>
        </div>
      ) : (
        <div data-test-id="step-1">
          <h2>Step 1</h2>
          <ChangesetWebform
            formSchema={formSchema}
            afterGenerateChangesetWebform={afterGenerateChangesetWebform}
            data-test-id="after-generate-changeset-webform-form"
          />
        </div>
      )}
      <div
        className="external body-text"
        data-test-id="after-generate-changeset-webform-feedback"
      >
        <h2>These buttons are not part of the ChangesetWebform component.</h2>
        <hr className="margin-top-lg" />
        <button
          className="btn btn-outline-gray-medium margin-top-lg"
          data-test-id="previous-button"
          type="button"
          onClick={prev}
        >
          Previous step
        </button>
        <button
          className="btn btn-outline-gray-medium margin-top-lg"
          data-test-id="next-button"
          type="button"
          onClick={next}
        >
          Next step
        </button>
      </div>
    </>
  );
}
// END-SNIPPET
