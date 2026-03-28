// BEGIN-SNIPPET static-content-example-two.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import ComponentForStaticContentField from '../forms/component-for-static-content-field';

const formSchema = {
  formSettings: {
    formName: 'staticContentExample2',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'staticContent',
      fieldType: 'staticContent',
      contentComponent: {
        componentClass: ComponentForStaticContentField,
        props: {
          info: 'This text was passed to the label component dynamically for this option, via the contentComponent.props object',
        },
      },
    },
  ],
};

export default function StaticContentExampleTwo() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
