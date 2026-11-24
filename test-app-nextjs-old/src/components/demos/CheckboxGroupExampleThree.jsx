'use client';

// BEGIN-SNIPPET checkbox-group-example-three.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'checkboxGroupExample3',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'checkboxes3',
      fieldType: 'checkboxGroup',
      fieldLabel: 'Custom label components',
      options: [
        {
          key: 'Option 1',
          optionLabelMarkdown: '**Option 1**',
        },
        {
          key: 'Option 2',
          optionLabelMarkdown: '_Option 2_',
        },
      ],
    },
  ],
};

export default function CheckboxGroupExampleThree() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
