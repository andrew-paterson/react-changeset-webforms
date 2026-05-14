'use client';

// BEGIN-SNIPPET validation-class-settings.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'validationClassNames',
    hideSubmitButton: true,
  },
  attrsFromConfig: {
    classNames: {
      fieldLabel: ['$inherited', '$validationClassNames'],
    },
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      showValidationWhenFocussed: true,
      // validatesOn: ['keyUp'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
    },
  ],
};

export default function ValidationClassSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
