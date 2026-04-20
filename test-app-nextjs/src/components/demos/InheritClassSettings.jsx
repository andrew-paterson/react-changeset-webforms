'use client';

// BEGIN-SNIPPET inherit-class-settings.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'inheritClassNames',
    hideSubmitButton: true,
  },
  attrsFromConfig: {
    classNames: {
      labelElement: ['$inherited', 'form-wide-label-class'],
    },
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
    },
  ],
};

export default function InheritClassSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
