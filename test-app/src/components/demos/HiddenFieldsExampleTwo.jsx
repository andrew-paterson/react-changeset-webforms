// BEGIN-SNIPPET hidden-fields-example-two.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'omittingFields2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'mealRequired',
      fieldLabel: 'Would you like to order a meal?',
      fieldType: 'radioButtonGroup',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
            description: 'Would you like to order a meal',
          },
        },
      ],
      options: ['Yes', 'No'],
    },
    {
      fieldId: 'mealOption',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Please select a meal option',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true, description: 'Meal option' },
        },
      ],
      options: ['Beef', 'Chicken', 'Vegetarian', 'Vegan'],
      omitted: {
        returns: false,
        where: 'anyConditionsTrue',
        conditions: [
          {
            fieldId: 'mealRequired',
            valueEquals: 'Yes',
          },
        ],
      },
    },
  ],
};

export default function HiddenFieldsExampleTwo() {
  const [changesetIsValid, setChangesetIsValid] = React.useState(false);

  async function onFieldValueChange(_formField, changesetWebform) {
    setChangesetIsValid(!changesetWebform.hasValidationErrors && !changesetWebform.hasUnvalidatedFields);
  }

  return (
    <div data-test-id="omitted-fields-example-two">
      <ChangesetWebform
        formSchema={formSchema}
        onFieldValueChange={onFieldValueChange}
      />
      {changesetIsValid && (
        <button
          data-test-id="next-button"
          className="btn btn-outline-primary"
          type="button"
        >
          Next
        </button>
      )}
    </div>
  );
}
// END-SNIPPET
