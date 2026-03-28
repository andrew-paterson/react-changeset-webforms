// BEGIN-SNIPPET field-settings-custom-parser.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'Email',
  },
  fields: [
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Enter your bluthcompany.com email address',
      defaultValue: 'steve',
    },
  ],
};

export default function FieldSettingsCustomParser() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
