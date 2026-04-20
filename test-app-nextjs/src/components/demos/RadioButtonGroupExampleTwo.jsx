'use client';

// BEGIN-SNIPPET radio-button-group-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import ComponentForAllRadioOptions from '../forms/ComponentForAllRadioOptions.jsx';
import ComponentForSingleRadioOption from '../forms/ComponentForSingleRadioOption.jsx';

const formSchema = {
  formSettings: {
    formName: 'radioButtonGroupExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'radioButtons2',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Custom label components',
      optionLabelComponent: {
        componentClass: ComponentForAllRadioOptions,
        props: {
          infoLink: 'https://example.com',
        },
      },
      options: [
        {
          label: 'Option 1',
          value: '1',
        },
        {
          label: 'Option 2',
          value: '2',
        },
        {
          label: 'Option 3',
          value: '3',
          optionLabelComponent: {
            componentClass: ComponentForSingleRadioOption,
            props: {
              info: 'This text was passed to the label component dynamically for this option, via the optionLabelComponent.props object.',
            },
          },
        },
      ],
    },
  ],
};

export default function RadioButtonGroupExampleTwo() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
