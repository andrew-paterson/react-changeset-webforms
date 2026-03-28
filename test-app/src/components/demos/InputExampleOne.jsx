// BEGIN-SNIPPET input-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'inputExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
    },
  ],
};

function onUserInteraction(...args) {
  console.log(args);
}

export default function InputExampleOne() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      onUserInteraction={onUserInteraction}
    />
  );
}
// END-SNIPPET
