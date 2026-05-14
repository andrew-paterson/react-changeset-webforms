'use client';

// BEGIN-SNIPPET app-wide-field-settings-overridden.jsx
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
      fieldId: 'checkboxGroup1',
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
      ],
    },
  ],
};

export default function AppWideFieldSettingsOverridden() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
