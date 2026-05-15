// BEGIN-SNIPPET select-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'selectExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'country',
      fieldType: 'select',
      fieldLabel: 'Country',
      placeholder: 'Select a country',
      optionValueProp: 'value',
      optionDisplayProp: 'label',
      options: [
        { value: 'za', label: 'South Africa' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'us', label: 'United States' },
        { value: 'de', label: 'Germany' },
      ],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
    },
  ],
};

function onUserInteraction(...args) {
  console.log(args);
}

export default function SelectExampleOne() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      onUserInteraction={onUserInteraction}
    />
  );
}
// END-SNIPPET
