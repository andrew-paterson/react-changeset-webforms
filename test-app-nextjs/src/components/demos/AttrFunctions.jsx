'use client';

// BEGIN-SNIPPET attr-functions.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

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
            if (element.textContent.includes('Label loaded at')) {
              return;
            }
            element.textContent = `${element.textContent} (Label loaded at ${new Date().toLocaleTimeString()})`;
            ('This value is set by an attr function from the form field config.');
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
}
// END-SNIPPET
