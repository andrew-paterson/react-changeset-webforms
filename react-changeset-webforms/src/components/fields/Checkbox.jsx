import { useCallback } from 'react';
import LabelledCheckbox from '../background/LabelledCheckbox.jsx';

export default function Checkbox({ formField, formSettings, changesetWebform, updateFieldValue, onUserInteraction, dataTestFieldId, ...rest }) {
  const checkboxToggled = useCallback(
    (value, event) => {
      updateFieldValue(value);
      onUserInteraction('checkboxToggled', value, event);
    },
    [updateFieldValue, onUserInteraction],
  );

  return (
    <LabelledCheckbox
      dataTestId={dataTestFieldId ? `${dataTestFieldId}-checkbox-option-${formField.fieldId}` : undefined}
      optionLabelDataTestClass="cwf-checkbox-label"
      value={formField.fieldValue}
      label={formField.checkBoxLabel}
      optionLabelComponent={formField.checkBoxLabelComponent}
      optionLabelMarkdown={formField.checkboxLabelMarkdown}
      changedAction={checkboxToggled}
      changesetWebform={changesetWebform}
      formField={formField}
      name={formField.name}
      containerName={formSettings?.formName}
      disabled={formField.disabled}
      option={{ key: formField.fieldId }}
      checkboxId={formField.id}
      ariaErrorMessage={formField.ariaErrorMessage}
      ariaDescribedBy={formField.ariaDescribedBy}
      required={formField.required}
      {...rest}
    />
  );
}
