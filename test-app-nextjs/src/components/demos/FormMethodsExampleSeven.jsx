'use client';

// BEGIN-SNIPPET form-methods-example-seven.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const data = {
  name: 'Steve Holt',
  email: 'steveholt@bluthcompany.com',
};

const formSchema = {
  formSettings: {
    formName: 'formMethods7',
    clearFormButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
      ],
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Email',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: {
            presence: true,
          },
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
    },
  ],
};

export default function FormMethodsExampleSeven() {
  const [actionsLog, setActionsLog] = React.useState([]);

  function beforeClearForm() {
    setActionsLog((prev) => [...prev, 'The beforeClearForm action was called']);
  }

  function afterClearForm() {
    setActionsLog((prev) => [...prev, 'The afterClearForm action was called']);
  }

  return (
    <>
      {actionsLog.length > 0 && (
        <div
          className="border rounded p-2 mb-4 bg-light"
          data-test-id="actions-log"
        >
          <ul>
            {actionsLog.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
      <ChangesetWebform
        formSchema={formSchema}
        data={data}
        beforeClearForm={beforeClearForm}
        afterClearForm={afterClearForm}
      />
    </>
  );
}
// END-SNIPPET
