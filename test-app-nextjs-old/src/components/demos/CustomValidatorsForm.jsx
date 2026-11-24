'use client';

// BEGIN-SNIPPET custom-validators-form.jsx
import ChangesetWebform from 'react-changeset-webforms';
import validateUniqueness from '../../validators/uniqueness';

const formSchema = {
  validators: {
    validateUniqueness,
  },
  formSettings: {
    formName: 'unique',
    submitButtonText: 'Submit',
  },
  fields: [
    {
      fieldId: 'primaryNumber',
      fieldLabel: 'Primary Number',
      fieldType: 'input',
      inputType: 'text',
      validationRules: [
        {
          validationMethod: 'validateUniqueness',
          arguments: {
            descriptionsMap: {
              primaryNumber: 'primary number',
              recoveryNumber: 'recovery number',
            },
          },
        },
      ],
    },
    {
      fieldId: 'recoveryNumber',
      fieldLabel: 'Recovery Number',
      fieldType: 'input',
      inputType: 'text',
      validationRules: [
        {
          validationMethod: 'validateUniqueness',
          arguments: {
            descriptionsMap: {
              primaryNumber: 'primary number',
              recoveryNumber: 'recovery number',
            },
          },
        },
      ],
    },
  ],
};

export default function CustomValidatorsForm() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      data-test-id="integrating-custom-validators-form"
    />
  );
}
// END-SNIPPET
