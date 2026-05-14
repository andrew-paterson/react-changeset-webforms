'use client';

// BEGIN-SNIPPET after-field-edit-action-form.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const userNamesFormSchema = {
  formSettings: {
    formName: 'names',
    submitButtonText: 'Submit',
    hideLabels: true,
  },
  fields: [
    {
      fieldId: 'firstName',
      fieldLabel: 'First name',
      fieldType: 'input',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
      inputType: 'text',
    },
    {
      fieldId: 'lastName',
      fieldLabel: 'Last name',
      fieldType: 'input',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
      inputType: 'text',
    },
  ],
};

export default function OnFieldValueChange() {
  const [fullName, setFullName] = React.useState(null);
  const [lastUpdateField, setLastUpdateField] = React.useState(null);
  const [formName, setFormName] = React.useState(null);

  function onFieldValueChange(formField, changesetWebform) {
    const firstName = changesetWebform.changeset.get('firstName') || '';
    const lastName = changesetWebform.changeset.get('lastName') || '';
    setFullName(`${firstName} ${lastName}`);
    setLastUpdateField(formField.fieldLabel);
    setFormName(changesetWebform.formSettings.formName);
  }

  return (
    <>
      <ChangesetWebform
        formSchema={userNamesFormSchema}
        onFieldValueChange={onFieldValueChange}
        data-test-id="after-field-edit-form"
      />
      {fullName && (
        <div data-test-id="after-field-edit-feedback">
          The user&apos;s full name is &quot;{fullName}&quot;.
          <br />
          The last updated field was {lastUpdateField}.
          <br />
          The value of settings.formName is {formName}.
        </div>
      )}
    </>
  );
}
// END-SNIPPET
