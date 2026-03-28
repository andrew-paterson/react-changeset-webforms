// BEGIN-SNIPPET single-checkbox-example-three.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import ComponentForSingleCheckboxOption from '../forms/ComponentForSingleCheckboxOption';

const formSchema = {
  formSettings: {
    formName: 'singleCheckboxExample3',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldLabel: 'Terms and conditions',
      fieldId: 'acceptTerms',
      fieldType: 'singleCheckbox',
      checkBoxLabelComponent: {
        componentClass: ComponentForSingleCheckboxOption,
        props: {
          info: 'This text was passed to the label component dynamically for this option, via the checkBoxLabelComponent.props object.',
        },
      },
    },
  ],
};

export default function SingleCheckboxExampleThree() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
