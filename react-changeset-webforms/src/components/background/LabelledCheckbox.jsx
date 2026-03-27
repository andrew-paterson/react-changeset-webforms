import React, { useCallback, useRef } from 'react';
import OptionLabelComponent from './OptionLabelComponent.jsx';
import { safeName } from 'validated-changeset-webforms';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * LabelledCheckbox
 *
 * Renders a checkbox paired with its label inside a wrapper div.
 * The `checkboxId` is derived as follows:
 *  - If `checkboxId` prop is provided, use it directly.
 *  - If `formField.fieldId === option.key` → `"{safeName(formField.id)}-checkbox"`.
 *  - Otherwise → `safeName("{formField.id}-checkbox-option-{option.key}")`.
 *
 * Props:
 *  - formField             {object}    The field model object.
 *  - option                {object}    The individual option (needs `.key`).
 *  - value                 {boolean}   Current checked state.
 *  - changedAction         {Function}  Called with `(checked, event)` on click.
 *  - checkboxId            {string}    Optional explicit id override.
 *  - name                  {string}    Input name attribute.
 *  - disabled              {boolean}
 *  - required              {boolean}
 *  - ariaErrorMessage      {string}    aria-errormessage id.
 *  - ariaDescribedBy       {string}    aria-describedby id.
 *  - optionLabelComponent  {object}    Custom label component config.
 *  - optionLabelMarkdown   {string}    Markdown label string.
 *  - label                 {string}    Plain-text label fallback.
 *  - optionLabelDataTestClass {string}
 *  - changesetWebform      {object}    Parent webform instance.
 *  - ...rest                           Spread onto the wrapper div.
 */
export default function LabelledCheckbox({ formField, option, value, changedAction, checkboxId: checkboxIdProp, name, disabled, required, ariaErrorMessage, ariaDescribedBy, optionLabelComponent, optionLabelMarkdown, label, optionLabelDataTestClass, changesetWebform, ...rest }) {
  const labelledCheckbox = useRef(null);
  const checkboxElement = useRef(null);
  const checkboxLabel = useRef(null);
  useAttrsFromConfig(labelledCheckbox, 'labelledCheckbox,optionWrapper', changesetWebform, formField);
  useAttrsFromConfig(checkboxElement, 'checkboxElement', changesetWebform, formField);
  useAttrsFromConfig(checkboxLabel, 'checkboxLabel', changesetWebform, formField);
  const checkboxId = (() => {
    if (checkboxIdProp) return checkboxIdProp;
    if (formField?.fieldId === option?.key) {
      return `${safeName(formField?.id)}-checkbox`;
    }
    return safeName(`${formField?.id}-checkbox-option-${option?.key}`);
  })();

  const labelId = checkboxId ? `${checkboxId}-label` : null;

  const handleClick = useCallback(
    (event) => {
      changedAction?.(event.target.checked, event);
    },
    [changedAction],
  );

  return (
    <div
      ref={labelledCheckbox}
      className={disabled ? 'disabled' : undefined}
      data-test-id={checkboxId}
      data-test-option={`checkbox-option-${option?.key}`}
      data-test-labelled-checkbox
      {...rest}
    >
      <input
        type="checkbox"
        checked={!!value}
        onClick={handleClick}
        onChange={() => {}} // controlled — onChange required by React to suppress warning
        disabled={disabled}
        id={checkboxId}
        data-set-custom-validity
        aria-errormessage={ariaErrorMessage}
        aria-describedby={ariaDescribedBy}
        name={name}
        ref={checkboxElement}
        required={required}
      />
      <OptionLabelComponent
        optionLabelComponent={optionLabelComponent}
        option={option}
        optionLabelMarkdown={optionLabelMarkdown}
        label={label}
        for={checkboxId}
        labelId={labelId}
        checked={!!value}
        changesetWebform={changesetWebform}
        formField={formField}
        data-test-class={optionLabelDataTestClass}
        ref={checkboxLabel}
      />
    </div>
  );
}
