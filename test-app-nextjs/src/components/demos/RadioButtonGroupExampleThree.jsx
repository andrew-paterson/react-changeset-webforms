'use client';

// BEGIN-SNIPPET radio-button-group-example-three.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'radioButtonGroupExample3',
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
          optionLabelMarkdown: '**Red**',
          value: 'ff0000',
        },
        {
          optionLabelMarkdown: '_Green_',
          value: '00ff00',
        },
      ],
    },
  ],
};

export default function RadioButtonGroupExampleThree() {
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
      {currentValue && <div data-test-id="current-value">Selected colour: {currentValue}</div>}
    </>
  );
}
// END-SNIPPET
