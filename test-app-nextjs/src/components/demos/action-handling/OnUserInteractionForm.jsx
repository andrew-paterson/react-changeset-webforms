'use client';

// BEGIN-SNIPPET after-field-click-action-form.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms';

const initialFormSchema = {
  formSettings: {
    formName: 'names',
    submitButtonText: 'Submit',
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
      fieldId: 'toggleNicknameField',
      fieldType: 'clicker',
      clickerText: 'Show nickname field',
    },
    {
      fieldId: 'nickName',
      fieldLabel: 'Nickname',
      fieldType: 'input',
      inputType: 'text',
      omitted: true,
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: { presence: true, description: 'Nickname' },
        },
      ],
    },
  ],
};

export default function OnUserInteractionForm() {
  const [alert, setAlert] = React.useState(null);

  function onUserInteraction(formField, changesetWebform, eventName) {
    if (eventName === 'click') {
      if (formField.fieldId === 'toggleNicknameField') {
        const nickNameField = changesetWebform.fields.find(
          (field) => field.fieldId === 'nickName',
        );
        const nowOmitted = !nickNameField.omitted;
        nickNameField.omitted = nowOmitted;
        formField.clickerText = nowOmitted
          ? 'Show nickname field'
          : 'Hide nickname field';
      }
    }
  }

  function submitData(data, changesetWebform) {
    const dataProps = [];
    for (const key in data) {
      dataProps.push(`"${key}" => "${data[key]}"`);
    }
    setAlert({
      type: 'success',
      message: `Validation passed, submit action fired with the following data: ${dataProps.join(', ')}.`,
    });
    const changeset = changesetWebform.changeset;
    changesetWebform.formSettings.submitButtonText = 'Re-submit';
    changeset.set('name', '');
    changeset.set('nickName', '');
  }

  function formValidationFailed(changesetWebform) {
    const validationError = changesetWebform.changeset.error;
    const errorProps = [];
    for (const key in validationError) {
      errorProps.push(
        `"${key}" => "${validationError[key].validation.join(', ')}"`,
      );
    }
    setAlert({
      type: 'danger',
      message: `Validation failed, submit action not fired. The following validation errors exist: ${errorProps.join(', ')}`,
    });
  }

  return (
    <>
      {alert && (
        <div className="external">
          <div className={`alert alert-${alert.type}`}>{alert.message}</div>
        </div>
      )}
      <ChangesetWebform
        formSchema={initialFormSchema}
        onUserInteraction={onUserInteraction}
        formValidationFailed={formValidationFailed}
        submitData={submitData}
        data-test-id="after-field-click-form"
      />
    </>
  );
}
// END-SNIPPET
