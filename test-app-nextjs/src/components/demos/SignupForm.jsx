'use client';

// BEGIN-SNIPPET signup-form.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'Signup',
    submitButtonText: 'Sign up',
    clearFormAfterSubmit: true,
    resetFormButton: true,
    clearFormButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldLabel: 'Name',
      fieldType: 'input',
      showValidationWhenFocussed: true,
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
    {
      fieldId: 'recoveryEmail',
      fieldLabel: 'Recovery email',
      fieldType: 'input',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true, description: 'Back up email address' },
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
      inputType: 'email',
    },
    {
      fieldId: 'password',
      fieldLabel: 'Password (Minimum 8 characters)',
      fieldType: 'input',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
        {
          validationMethod: 'validateLength',
          arguments: { min: 8, max: 72 },
        },
      ],
      inputType: 'password',
    },
    {
      fieldId: 'acceptTerms',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Do you agree to the terms and conditions?',
      validationRules: [
        {
          validationMethod: 'validateInclusion',
          arguments: {
            list: ['true'],
            message: 'You must accept the terms to continue.',
          },
        },
      ],
      options: [
        {
          label: 'I agree',
          value: 'true',
        },
        {
          label: 'I do not agree',
          value: 'false',
        },
      ],
    },
    {
      fieldId: 'confirmHuman',
      fieldType: 'singleCheckbox',
      fieldLabel: 'Are you a human?',
      checkBoxLabel: 'Are you human',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
            message: 'Please confirm that you are not a robot.',
          },
        },
      ],
    },
    {
      fieldId: 'cookieConsent',
      fieldType: 'checkboxGroup',
      fieldLabel: 'Please select the cookies you consent to',
      validationRules: [
        {
          validationMethod: 'validateLength',
          arguments: {
            min: 2,
            allowNone: false,
            message: 'You must select at least two cookie consent options.',
          },
        },
      ],
      options: [
        {
          label: 'Essential',
          key: 'essential',
        },
        {
          label: 'Analytics',
          key: 'analytics',
        },
        {
          label: 'Marketing',
          key: 'marketing',
        },
      ],
    },
  ],
};

function submit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export default function SignupForm() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submit}
      data={{ email: 'tobias@bluthcompany.com', recoveryEmail: 'test' }}
    />
  );
}
// END-SNIPPET
