'use client';

// BEGIN-SNIPPET field-specific-class-settings.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'fieldClassNames',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      attrsFromConfig: {
        classNames: {
          fieldLabel: ['$inherited', 'class-for-the-field-label-of-this-field'],
        },
      },
    },
    {
      fieldId: 'radioButtons1',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Basic usage',
      attrsFromConfig: {
        classNames: {
          labelElement: ['class-for-all-label-els-in-this-field'],
          radioButtonLabel: [],
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
      ],
    },
  ],
};

export default function FieldSpecificClassSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
