// BEGIN-SNIPPET hidden-fields-example-four.jsx"
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'omittingFields4',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'isMember',
      fieldLabel: 'Are you a member?',
      fieldType: 'radioButtonGroup',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
            description: 'Are you a member',
          },
        },
      ],
      options: ['Yes', 'No'],
    },
    {
      fieldId: 'mains',
      fieldType: 'input',
      inputType: 'number',
      min: 1,
      max: 3,
      fieldLabel: 'How many main meals would you like to order?',
      validationRules: [
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'number' },
        },
      ],
    },
    {
      fieldId: 'sides',
      fieldType: 'input',
      inputType: 'number',
      min: 1,
      max: 3,
      fieldLabel: 'How many side dishes would you like to order?',
      validationRules: [
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'number' },
        },
      ],
    },
    {
      fieldId: 'freeDrink',
      fieldType: 'radioButtonGroup',
      fieldLabel: `You've qualified for a free drink!  You can select one of the following:`,
      options: ['Orange juice', 'Water', 'Chocolate milk'],
      omitted: {
        returns: false,
        where: 'anyConditionsTrue',
        conditions: [
          {
            fieldId: 'isMember',
            valueEquals: 'Yes',
          },
          {
            returns: true,
            where: 'allConditionsTrue',
            conditions: [
              {
                fieldId: 'mains',
                valueEquals: '3',
              },
              {
                fieldId: 'sides',
                valueEquals: '3',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default function HiddenFieldsExampleFour() {
  return (
    <div data-test-id="omitted-fields-example-4">
      Free drink for members and orders including 3 mains and 3 side dishes!
      <ChangesetWebform formSchema={formSchema} />
    </div>
  );
}
// END-SNIPPET
