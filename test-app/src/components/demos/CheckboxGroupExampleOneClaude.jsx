// BEGIN-SNIPPET checkbox-group-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'checkboxGroupExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'checkboxes1',
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
        {
          label: 'Option 3',
          key: '3',
        },
      ],
    },
  ],
};

export default function CheckboxGroupExampleOne() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
