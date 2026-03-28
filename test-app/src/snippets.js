export default [
  {
    name: 'attr-functions.jsx',
    text: `import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'attrFunctions',
  },
  attrFunctions: {
    submitButton(element, changesetWebform) {
      if (changesetWebform.formSettings.requestInFlight) {
        element.classList.replace('btn-primary', 'btn-success');
      } else {
        element.classList.replace('btn-success', 'btn-primary');
      }
    },
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      attrsFromConfig: {
        attrFunctions: {
          fieldLabel(element, _changesetWebform, _formField) {
            element.textContent = 'Test';
          },
        },
      },
    },
  ],
};

function submit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

export default function AttrFunctions() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      submitData={submit}
    />
  );
}`,
  },
  {
    name: 'attr-functions.js',
    text: `console.log('foo')`,
  },
];
