// BEGIN-SNIPPET single-checkbox-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'singleCheckboxExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'acceptTerms',
      fieldType: 'singleCheckbox',
      fieldLabel: 'I agree to the terms and conditions',
      checkBoxLabel: 'I agree to the terms and conditions',
    },
  ],
};

export default function SingleCheckboxExampleOne() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
