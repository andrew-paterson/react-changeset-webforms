import { useMemo, useCallback, useRef } from 'react';
import LabelledCheckbox from '../background/LabelledCheckbox.jsx';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

function stringToArray(value) {
  let array;
  if (typeof value === 'string') {
    array = value.split(',').map((item) => item.trim());
  } else {
    array = value || [];
  }
  return array.map((item) => item.trim());
}

export default function CheckboxGroup({ formField, changesetWebform, updateFieldValue, onUserInteraction, ...rest }) {
  const optionsWrapper = useRef(null);
  useAttrsFromConfig(optionsWrapper, 'optionsWrapper', changesetWebform, formField);
  // optionsWrapper
  const options = useMemo(() => {
    const checkedItems = stringToArray(formField.fieldValue);
    const checkedCount = checkedItems.filter((item) => formField.options.some((o) => o.key === item)).length;

    return (formField.options || []).map((option) => ({
      ...option,
      value: checkedItems.includes(option.key),
      onlyCheckedOption: checkedCount === 1 && checkedItems.includes(option.key),
    }));
  }, [formField.fieldValue, formField.options]);

  const checkboxToggled = useCallback(
    (option, value, event) => {
      let checkedItems = stringToArray(formField.fieldValue);
      if (value) {
        if (!checkedItems.includes(option.key)) {
          checkedItems = [...checkedItems, option.key].sort();
        }
      } else {
        checkedItems = checkedItems.filter((item) => item !== option.key);
      }
      const newValue = checkedItems.length === 0 ? null : checkedItems;
      updateFieldValue(newValue);
      onUserInteraction('checkboxToggled', newValue, event);
    },
    [formField.fieldValue, updateFieldValue, onUserInteraction],
  );

  return (
    <div
      ref={optionsWrapper}
      data-test-id="options-wrapper"
      aria-label={formField.ariaLabel}
      {...filterHtmlProps(rest)}
    >
      {options.map((option) => (
        <LabelledCheckbox
          key={option.key}
          value={option.value}
          label={option.label}
          optionLabelComponent={option.optionLabelComponent || formField.optionLabelComponent}
          optionLabelMarkdown={option.optionLabelMarkdown}
          changedAction={(value, event) => checkboxToggled(option, value, event)}
          name={formField.name}
          disabled={option.disabled || formField.disabled || (formField.preventEmpty && option.onlyCheckedOption)}
          option={option}
          changesetWebform={changesetWebform}
          formField={formField}
        />
      ))}
    </div>
  );
}
