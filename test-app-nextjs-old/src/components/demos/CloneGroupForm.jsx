'use client';

// BEGIN-SNIPPET clone-group-form.jsx
import ChangesetWebform from 'react-changeset-webforms';

export const formSchema = {
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
        fieldLabel: 'Email',
        fieldType: 'input',
        inputType: 'email',
        hideLabel: true,
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'uniqueClone',
            arguments: {
              description: 'email',
            },
          },
        ],
      },
    },
  ],
};

export default function CloneGroupForm() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      data-test-id="clonable-field-basics"
    />
  );
}
// END-SNIPPET
