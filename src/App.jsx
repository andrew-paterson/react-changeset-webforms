import './App.css';
import ChangesetWebform from './components/ChangesetWebform.jsx';

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
  ],
};

function App() {
  return <ChangesetWebform formSchema={formSchema} />;
}

export default App;
