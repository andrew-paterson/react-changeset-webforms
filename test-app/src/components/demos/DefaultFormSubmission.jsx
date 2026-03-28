// BEGIN-SNIPPET default-form-submission.jsx
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

const formSchema = {
  formSettings: {
    formName: 'defaultFormSubmission',
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
      ],
    },
  ],
};

const serverResponseFormSchema = {
  formSettings: {
    formName: 'defaultFormSubmission',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'serverResponseType',
      fieldType: 'radioButtonGroup',
      fieldLabel: 'Server response type',
      options: ['Asynchronous success response', 'Asynchronous error response', 'Synchronous success response', 'Synchronous error response'],
    },
  ],
};

export default function DefaultFormSubmission() {
  const [serverResponseType, setServerResponseType] = React.useState('Asynchronous success response');
  const [alert, setAlert] = React.useState(null);

  function submitData(data, _changesetWebform) {
    if (serverResponseType.startsWith('Asynchronous')) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (serverResponseType.includes('error')) {
            reject(new Error(serverResponseType));
          } else {
            resolve(serverResponseType);
          }
        }, 500);
      });
    } else {
      if (serverResponseType.includes('error')) {
        throw new Error(serverResponseType);
      } else {
        return serverResponseType;
      }
    }
  }

  function submitSuccess(response) {
    setAlert({ type: 'success', message: response });
  }

  function submitError(error) {
    setAlert({ type: 'danger', message: error.message });
  }

  function onFieldValueChange(formField) {
    setServerResponseType(formField.fieldValue);
  }

  function removeAlert() {
    setAlert(null);
  }

  return (
    <>
      <div className="bg-light px-4 py-1 border-bottom">
        <ChangesetWebform
          formSchema={serverResponseFormSchema}
          onFieldValueChange={onFieldValueChange}
          data={{ serverResponseType }}
        />
      </div>
      {alert && (
        <div
          data-test-id="default-form-submission-alert"
          className={`alert alert-${alert.type}`}
        >
          {alert.message}
          <button
            type="button"
            data-test-id="remove-alert"
            onClick={removeAlert}
          />
        </div>
      )}
      <ChangesetWebform
        formSchema={formSchema}
        submitData={submitData}
        submitSuccess={submitSuccess}
        submitError={submitError}
      />
    </>
  );
}
// END-SNIPPET
