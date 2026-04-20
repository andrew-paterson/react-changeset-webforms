'use client';

// BEGIN-SNIPPET clone-group-form-with-keyup.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'Country ISO codes',
    submitButtonText: 'Submit',
    clearFormAfterSubmit: true,
  },
  fields: [
    {
      fieldId: 'countryCodes',
      fieldLabel: 'Country ISO codes',
      fieldType: 'clone-group',
      minClones: 2,
      cloneFieldSchema: {
        fieldLabel: 'Country code',
        fieldType: 'input',
        inputType: 'text',
        hideLabel: true,
        showValidationWhenFocussed: true,
        validatesOn: ['valueUpdated'],
        validationRules: [
          {
            validationMethod: 'validateLength',
            arguments: {
              max: 3,
              description: 'Country code',
            },
          },
        ],
      },
    },
  ],
};

export default function CloneGroupFormWithKeyup() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
