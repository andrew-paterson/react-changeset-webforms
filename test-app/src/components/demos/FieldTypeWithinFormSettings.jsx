// BEGIN-SNIPPET field-type-within-form-settings.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'fieldTypeWithinFormClassnames',
    hideSubmitButton: true,
  },
  fieldSettings: {
    fieldTypes: [
      {
        fieldType: 'input',
        attrsFromConfig: {
          classNames: {
            labelElement: ['$inherited', 'form-wide-label-class'],
          },
        },
      },
      {
        fieldType: 'radioButtonGroup',
        attrsFromConfig: {
          classNames: {
            labelElement: ['form-wide-radio-button-label-el-class'],
            radioButtonLabel: [],
          },
        },
      },
    ],
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
    {
      fieldId: 'radioButtons2',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'A second field',
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

export default function FieldTypeWithinFormSettings() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
