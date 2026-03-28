// BEGIN-SNIPPET form-wide-class-settings.jsx"
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'formClassNames',
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

export default function FormWideClassSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
