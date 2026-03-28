// BEGIN-SNIPPET single-checkbox-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'singleCheckboxExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldLabel: 'Terms and conditions',
      fieldId: 'acceptTerms',
      fieldType: 'singleCheckbox',
      checkboxLabelMarkdown: 'I agree to the __**[terms and conditions here](https://example.com)**__.',
    },
  ],
};

export default function SingleCheckboxExampleTwo() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
