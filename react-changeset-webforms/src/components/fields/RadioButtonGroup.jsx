import { useCallback, useRef } from 'react';
import LabelledRadioButton from '../background/LabelledRadioButton.jsx';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

export default function RadioButtonGroup({ formField, formSettings, changesetWebform, updateFieldValue, onUserInteraction, ...rest }) {
  const optionsWrapper = useRef(null);
  useAttrsFromConfig(optionsWrapper, 'optionsWrapper', changesetWebform, formField);
  const onRadioChange = useCallback(
    (value) => {
      onUserInteraction('radioOptionChanged', value);
      updateFieldValue(value);
    },
    [onUserInteraction, updateFieldValue],
  );

  return (
    <div
      ref={optionsWrapper}
      aria-label={formField.ariaLabel}
      data-test-id="options-wrapper"
      {...filterHtmlProps(rest)}
    >
      {(formField.options || []).map((option) => (
        <LabelledRadioButton
          key={option.value}
          value={option.value}
          groupValue={formField.fieldValue}
          name={formField.name || formField.id}
          disabled={formField.disabled ? true : option.disabled}
          label={option.label}
          optionLabelComponent={option.optionLabelComponent || formField.optionLabelComponent}
          optionLabelMarkdown={option.optionLabelMarkdown}
          containerName={formSettings?.formName}
          changedAction={onRadioChange}
          option={option}
          changesetWebform={changesetWebform}
          required={formField.required}
          formField={formField}
        />
      ))}
    </div>
  );
}
