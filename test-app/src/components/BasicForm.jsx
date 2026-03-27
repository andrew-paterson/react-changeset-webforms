import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'appClassNames',
    hideSubmitButton: false,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true },
        },
      ],
    },
    {
      fieldId: 'checkboxGroup1',
      fieldType: 'checkboxGroup',
      fieldLabel: 'Basic usage',
      options: [
        {
          label: 'Option 1',
          key: '1',
        },
        {
          label: 'Option 2',
          key: '2',
        },
      ],
    },
    {
      fieldId: 'rgbColours',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Select colour',
      attrsFromConfig: {
        classNames: {
          optionsWrapper: ['$inherited', 'd-flex', 'foo'],
          labelledRadioButton: ['$inherited', 'me-4'],
        },
      },
      options: [
        {
          label: 'Red',
          value: 'ff0000',
        },
        {
          label: 'Green',
          value: '00ff00',
        },
        {
          label: 'Blue',
          value: '0000ff',
        },
      ],
    },
    {
      fieldId: 'description',
      fieldType: 'textarea',
      fieldLabel: 'Description',
      placeholder: 'Enter your description here',
    },
    {
      fieldId: 'user-emails',
      fieldLabel: 'User emails',
      fieldType: 'clone-group',
      omitted: false,
      minClones: 1,
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
      cloneButtonText: 'Add another email',
      cloneFieldSchema: {
        fieldLabel: 'User email',
        fieldType: 'input',
        inputType: 'text',
        hideLabel: true,
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email', description: 'User email' },
          },
          {
            validationMethod: 'uniqueClone',
            arguments: {
              description: 'Each user email',
            },
          },
        ],
      },
    },
  ],
};

function submitForm(data, changesetWebform) {
  return new Promise((resolve) => {
    setTimeout(() => {
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
      resolve();
    }, 700);
  });
}

function formValidationFailed(changesetWebform) {
  console.log('ChangesetWebform instance:', changesetWebform);
}

function BasicForm() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submitForm}
      formValidationFailed={formValidationFailed}
    />
  );
}

export default BasicForm;
