import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'appClassNames',
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
          optionsWrapper: ['$inherited', 'd-flex'],
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
      fieldId: 'Users',
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
      cloneButtonText: 'Add user name',
      cloneFieldSchema: {
        fieldLabel: 'User name',
        fieldType: 'input',
        inputType: 'text',
        validationRules: [
          // {
          //   validationMethod: 'validateFormat',
          //   arguments: { type: 'email' },
          // },
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'uniqueClone',
            arguments: {
              description: 'User name',
            },
          },
        ],
      },
    },
  ],
};

function BasicForm() {
  return <ChangesetWebform formSchema={formSchema} />;
}

export default BasicForm;
