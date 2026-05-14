'use client';

// BEGIN-SNIPPET radio-button-group-example-one.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'radioButtonGroupExample',
    hideSubmitButton: true,
  },
  fields: [
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
  ],
};

export default function RadioButtonGroupExampleOne() {
  const [currentValue, setCurrentValue] = React.useState(null);

  function onFieldValueChange(formField) {
    setCurrentValue(formField.fieldValue);
  }

  return (
    <>
      <ChangesetWebform
        formSchema={formSchema}
        onFieldValueChange={onFieldValueChange}
      />
      {currentValue && (
        <div data-test-id="current-value">Selected colour: {currentValue}</div>
      )}
    </>
  );
}
// END-SNIPPET
