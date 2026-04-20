'use client';

// BEGIN-SNIPPET after-field-validation-form.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const nameAndEmailFormSchema = {
  formSettings: {
    formName: 'nameAndEmail',
    submitButtonText: 'Submit',
    hideLabels: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldLabel: 'Name',
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
      fieldId: 'email',
      fieldLabel: 'Email',
      fieldType: 'input',
      validatesOn: ['$inherited', 'insertWithValue'],
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
        {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' },
        },
      ],
      inputType: 'email',
    },
  ],
};

export default function AfterFieldValidationForm() {
  const [lastValidatedField, setLastValidatedField] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [lastUpdatedFieldValue, setLastUpdatedFieldValue] = React.useState(null);
  const [fieldValidationErrors, setFieldValidationErrors] = React.useState(null);
  const [allFields, setAllFields] = React.useState(null);
  const [formName, setFormName] = React.useState(null);

  function afterFieldValidation(formField, changesetWebform, fieldValidationErrors) {
    setName(changesetWebform.changeset.get('name'));
    setEmail(changesetWebform.changeset.get('email'));
    setLastValidatedField(formField.fieldLabel);
    setLastUpdatedFieldValue(changesetWebform.changeset.get(formField.propertyName));
    setFieldValidationErrors(fieldValidationErrors);
    setAllFields(changesetWebform.fields.map((field) => field.fieldId).join(', '));
    setFormName(changesetWebform.formSettings.formName);
  }

  return (
    <>
      <ChangesetWebform
        formSchema={nameAndEmailFormSchema}
        afterFieldValidation={afterFieldValidation}
        data-test-id="after-field-validation-form"
      />
      {lastValidatedField && (
        <div data-test-id="after-field-validation-feedback">
          The user's name is "{name}".
          <br />
          The last validated field was {lastValidatedField}.<br />
          {fieldValidationErrors?.validation?.length ? (
            <>
              The first argument to the afterFieldValidation argument has the following values:
              <br />
              <code>value: "{fieldValidationErrors.value}"</code>
              <br />
              <code>validation: [{fieldValidationErrors.validation}]</code>
              <br />
            </>
          ) : (
            <>
              The {lastValidatedField} has no validation errors when its value is {lastUpdatedFieldValue}.<br />
            </>
          )}
          The form has the following fields: {allFields}.<br />
          The value of settings.formName is {formName}.
        </div>
      )}
    </>
  );
}
// END-SNIPPET
