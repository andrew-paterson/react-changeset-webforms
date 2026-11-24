'use client';

// BEGIN-SNIPPET field-settings-overridden.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'appClassNames',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
    },
    {
      fieldId: 'radioButtons1',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Basic usage',
      options: [
        {
          label: 'Option 1',
          value: '1',
        },
        {
          label: 'Option 2',
          value: '2',
        },
      ],
    },
  ],
};

export default function FieldSettingsOverridden() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
