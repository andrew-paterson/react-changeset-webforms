let formSchema;
formSchema = {
  formSettings: {
    formName: 'Signup',
    submitButtonText: 'Sign up',
    clearFormAfterSubmit: true,
    resetFormButton: true,
    clearFormButton: true,
  },
  fields: [
    {
      fieldId: 'input',
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
      fieldId: 'textarea',
      fieldLabel: 'Description',
      fieldType: 'textarea',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
    },
    {
      fieldId: 'powerSelect',
      fieldLabel: 'Country',
      fieldType: 'powerSelect',
      placeholder: 'Select',
      searchEnabled: true,
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true },
        },
      ],
      options: [
        'Afghanistan',
        'Åland Islands',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua and Barbuda',
        'United States',
      ],
    },
    {
      fieldId: 'powerDatePicker',
      fieldLabel: 'Date of Birth',
      fieldType: 'powerDatePicker',
      showTimeSelector: true,
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true },
        },
      ],
    },
    {
      searchEnabled: true,
      fieldId: 'powerSelectCheckboxes',
      fieldType: 'powerSelectCheckboxes',
      multipleSelection: true,
      allowFreeTyping: true,
      fieldLabel: 'Colours',
      options: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true },
        },
      ],
    },
    {
      fieldId: 'radioButtonGroup',
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
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
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
      fieldId: 'singleCheckbox',
      fieldType: 'singleCheckbox',
      fieldLabel: 'Are you human?', // TODO should these just be one?
      checkBoxLabel: 'Are you human?',
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
      fieldId: 'checkboxGroup',
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
    // {
    //   fieldId: 'clone-group',
    //   fieldLabel: 'User emails',
    //   fieldType: 'clone-group',
    //   minClones: 2,
    //   maxClones: 4,
    //   validationRules: [
    //     {
    //       validationMethod: 'validateLength',
    //       arguments: {
    //         description: 'emails',
    //         message: 'Too many {description} (maximum is {max}).',
    //         max: 4,
    //       },
    //     },
    //   ],
    //   cloneButtonText: 'Add email address',
    //   cloneFieldSchema: {
    //     fieldLabel: 'Email',
    //     fieldType: 'input',
    //     inputType: 'email',
    //     hideLabel: true,
    //     validationRules: [
    //       {
    //         validationMethod: 'validateFormat',
    //         arguments: { type: 'email' },
    //       },
    //       {
    //         validationMethod: 'validatePresence',
    //         arguments: true,
    //       },
    //       {
    //         validationMethod: 'uniqueClone',
    //         arguments: {
    //           description: 'email',
    //         },
    //       },
    //     ],
    //   },
    // },
  ],
};
export default formSchema;
