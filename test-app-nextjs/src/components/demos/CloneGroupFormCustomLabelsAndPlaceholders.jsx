'use client';

// BEGIN-SNIPPET clone-group-form-function-field-label.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'addEmails',
    submitButtonText: 'Submit',
    clearFormAfterSubmit: true,
  },
  fields: [
    {
      fieldId: 'emails',
      fieldLabel: 'User emails',
      fieldType: 'clone-group',
      minClones: 2,
      maxClones: 4,
      validationRules: [
        {
          validationMethod: 'validateLength',
          arguments: {
            description: 'emails',
            message: 'Too many {description} (maximum is {max}).',
            max: 4,
          },
        },
      ],
      cloneButtonText: 'Add email address',
      cloneFieldSchema: {
        fieldLabel: (clone) => {
          const counter = ['first', 'second', 'third', 'fourth'];
          const index = clone.index;
          return `Label for ${counter[index]} email`;
        },
        placeholder: (clone) => {
          const counter = ['1st', '2nd', '3rd', '4th'];
          const index = clone.index;
          return `Placeholder for ${counter[index]} email`;
        },
        fieldType: 'input',
        inputType: 'email',
        hideLabel: false,
      },
    },
  ],
};

export default function CloneGroupFormCustomLabelsAndPlaceholders() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
