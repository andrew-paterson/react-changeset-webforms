// BEGIN-SNIPPET validation-events.jsx"
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'validationEvents',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      placeholder: 'Name (default validation events)',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
      ],
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Email',
      placeholder: 'Email (Custom validation events, without $inherited)',
      validatesOn: ['keyUp'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
        {
          validationMethod: 'validateFormat',
          arguments: {
            type: 'email',
          },
        },
      ],
    },
    {
      fieldId: 'phoneNumber',
      fieldType: 'input',
      fieldLabel: 'Phone number',
      placeholder: 'Phone number (Custom validation events, with $inherited)',
      validatesOn: ['$inherited', 'keyUp'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
        {
          validationMethod: 'validateLength',
          arguments: {
            min: 3,
            max: 15,
          },
        },
      ],
    },
  ],
};

export default function ValidationEvents() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
