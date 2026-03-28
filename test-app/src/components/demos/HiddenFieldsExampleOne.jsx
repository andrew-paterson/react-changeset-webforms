// BEGIN-SNIPPET hidden-fields-example-one.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'omittingFields1',
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
      omitted: true,
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true, description: 'Meal option' },
        },
      ],
      options: ['Beef', 'Chicken', 'Vegetarian', 'Vegan'],
    },
  ],
};

export default function HiddenFieldsExampleOne() {
  const [changesetIsValid, setChangesetIsValid] = React.useState(false);

  async function onFieldValueChange(formField, changesetWebform) {
    if (formField.fieldId === 'mealRequired') {
      if (formField.fieldValue === 'Yes') {
        changesetWebform.setFieldOmission('mealOption', false);
      } else {
        changesetWebform.setFieldOmission('mealOption', true);
      }
    }
    setChangesetIsValid(!changesetWebform.hasValidationErrors && !changesetWebform.hasUnvalidatedFields);
  }

  return (
    <div data-test-id="omitted-fields-example-one">
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
