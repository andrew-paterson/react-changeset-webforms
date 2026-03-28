// BEGIN-SNIPPET custom-field-usage.jsx"
import React from 'react';
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import validatePhoneNumber from '../../validators/phone-number';

const formSchema = {
  validators: {
    validatePhoneNumber,
  },
  formSettings: {
    formName: 'Phone number with country code',
  },
  fields: [
    {
      fieldId: 'phoneNumber',
      fieldType: 'phoneNumberWithCountryCode',
      fieldLabel: 'Phone number',
      validationRules: [
        {
          validationMethod: 'validatePresence',
          arguments: true,
        },
        {
          validationMethod: 'validatePhoneNumber',
        },
      ],
    },
  ],
};

export default function CustomFieldUsage() {
  const [phoneNumber, setPhoneNumber] = React.useState(null);

  function updatePhoneNumber(formField, changesetWebform) {
    if (changesetWebform.changeset.isValid) {
      setPhoneNumber(formField.fieldValue);
    } else {
      setPhoneNumber(null);
    }
  }

  return (
    <>
      <ChangesetWebform
        formSchema={formSchema}
        onFieldValueChange={updatePhoneNumber}
      />
      {phoneNumber && <p>The phone number entered is {phoneNumber}</p>}
    </>
  );
}
// END-SNIPPET
