'use client';

// BEGIN-SNIPPET checkbox-group-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms';
import ComponentForAllCheckboxOptions from '../forms/ComponentForAllCheckboxOptions.jsx';
import ComponentForSingleCheckboxOption from '../forms/ComponentForSingleCheckboxOption.jsx';

const formSchema = {
  formSettings: {
    formName: 'checkboxGroupExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'checkboxes2',
      fieldType: 'checkboxGroup',
      fieldLabel: 'Custom label components',
      optionLabelComponent: {
        componentClass: ComponentForAllCheckboxOptions,
        props: {
          infoLink: 'https://example.com',
        },
      },
      options: [
        {
          label: 'Option 1',
          key: '1',
        },
        {
          label: 'Option 2',
          key: '2',
        },
        {
          label: 'Option 3',
          key: '3',
          optionLabelComponent: {
            componentClass: ComponentForSingleCheckboxOption,
            props: {
              info: 'This text was passed to the label component dynamically for this option, via the optionLabelComponent.props object.',
            },
          },
        },
      ],
    },
  ],
};

export default function CheckboxGroupExampleTwo() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
