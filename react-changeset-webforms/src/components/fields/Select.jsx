import { useCallback, useRef } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import ClearSelect from '../background/ClearSelect.jsx';

export default function Select({
  formField,
  changesetWebform,
  updateFieldValue,
  onUserInteraction,
  ...rest
}) {
  const selectRef = useRef(null);
  const clearButtonRef = useRef(null);
  const selectContainer = useRef(null);

  useAttrsFromConfig(
    selectRef,
    'selectElement,selectField',
    changesetWebform,
    formField,
  );

  // useAttrsFromConfig(
  //   clearButtonRef,
  //   'selectClearButton',
  //   changesetWebform,
  //   formField,
  // );

  useAttrsFromConfig(
    selectContainer,
    'selectContainer',
    changesetWebform,
    formField,
  );

  const onChange = useCallback(
    (event) => {
      const selected = formField.multiple
        ? Array.from(event.target.selectedOptions).map((o) => o.value)
        : event.target.value;
      updateFieldValue(selected);
      onUserInteraction('change', selected, event);
    },
    [formField, updateFieldValue, onUserInteraction],
  );

  const handleUserInteraction = useCallback(
    (eventName, event) => {
      const value = formField.multiple
        ? Array.from(event.target.selectedOptions).map((o) => o.value)
        : event.target.value;
      onUserInteraction(eventName, value, event);
      if (eventName === 'focusOut') {
        formField.focussed = false;
      } else if (eventName === 'focusIn') {
        formField.focussed = true;
      }
    },
    [formField, onUserInteraction],
  );

  const options = formField.options ?? [];
  const fieldValue = formField.fieldValue;

  function isSelected(optionValue) {
    if (formField.multiple && Array.isArray(fieldValue)) {
      return fieldValue.includes(optionValue);
    }
    return fieldValue === optionValue;
  }

  function getOptionValue(option) {
    return formField.optionValueProp
      ? option[formField.optionValueProp]
      : option;
  }

  function getOptionLabel(option) {
    return formField.optionDisplayProp
      ? option[formField.optionDisplayProp]
      : option;
  }

  function clear() {
    updateFieldValue(null);
    onUserInteraction('clear', formField);
  }

  return (
    <div ref={selectContainer}>
      <select
        value={fieldValue ?? (formField.multiple ? [] : '')}
        onChange={onChange}
        onBlur={(e) => handleUserInteraction('focusOut', e)}
        onFocus={(e) => handleUserInteraction('focusIn', e)}
        disabled={formField.disabled}
        multiple={formField.multiple}
        name={formField.name}
        id={formField.id}
        aria-labelledby={formField.ariaLabelledBy}
        aria-label={formField.ariaLabel}
        aria-errormessage={formField.ariaErrorMessage}
        aria-describedby={formField.ariaDescribedBy}
        aria-invalid={formField.ariaInvalid}
        required={formField.required}
        tabIndex={formField.tabindex}
        ref={selectRef}
        {...filterHtmlProps(rest)}
      >
        {formField.placeholder && !formField.multiple && (
          <option
            value=""
            disabled={!formField.allowClear}
            hidden={!formField.allowClear}
          >
            {formField.placeholder}
          </option>
        )}
        {options.map((option, index) => {
          const value = getOptionValue(option);
          const label = getOptionLabel(option);
          return (
            <option key={index} value={value} selected={isSelected(value)}>
              {label}
            </option>
          );
        })}
      </select>
      <ClearSelect
        formField={formField}
        changesetWebform={changesetWebform}
        clear={clear}
      />
      {/*  {formField.allowClear === true && formField.fieldValue != null && (
         <button ref={clearButtonRef} onClick={clear}>
           Clear
         </button>
       )} */}
    </div>
  );
}
