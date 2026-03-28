// BEGIN-SNIPPET override-class-settings.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'overrideClassNames',
    hideSubmitButton: true,
  },
  attrsFromConfig: {
    classNames: {
      labelElement: ['form-wide-label-class'],
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

export default function OverrideClassSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
