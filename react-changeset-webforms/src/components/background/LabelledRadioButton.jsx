import React, { useCallback, useRef } from 'react';
import RadioButton from './RadioButton.jsx';
import OptionLabelComponent from './OptionLabelComponent.jsx';
import { safeName } from 'validated-changeset-webforms';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * LabelledRadioButton
 *
 * Renders a radio button paired with its label inside a wrapper div.
 * The `radioId` is derived from the field/option relationship:
 *  - When `formField.fieldId === option.value` → use `safeName(formField.id)`.
 *  - Otherwise → `safeName("{formField.id}-radio-option-{option.value}")`.
 *
 * Props:
 *  - formField             {object}    The field model object.
 *  - option                {object}    The individual option (needs `.value`).
 *  - value                 {any}       The value this radio represents.
 *  - groupValue            {any}       The currently selected group value.
 *  - changedAction         {Function}  Called with the new value on change.
 *  - name                  {string}    Input name attribute.
 *  - disabled              {boolean}
 *  - required              {boolean}
 *  - optionLabelComponent  {object}    Custom label component config.
 *  - optionLabelMarkdown   {string}    Markdown label string.
 *  - label                 {string}    Plain-text label fallback.
 *  - optionLabelDataTestClass {string}
 *  - changesetWebform      {object}    Parent webform instance.
 */
export default function LabelledRadioButton({ formField, option, value, groupValue, changedAction, name, disabled, required, optionLabelComponent, optionLabelMarkdown, label, optionLabelDataTestClass, changesetWebform }) {
  const labelledRadioButton = useRef(null);
  const radioButtonElement = useRef(null);
  const radioButtonLabel = useRef(null);
  useAttrsFromConfig(labelledRadioButton, 'labelledRadioButton', changesetWebform, formField);
  useAttrsFromConfig(radioButtonElement, 'radioButtonElement', changesetWebform, formField);
  useAttrsFromConfig(radioButtonLabel, 'radioButtonLabel', changesetWebform, formField);
  const radioId = formField?.fieldId === option?.value ? safeName(formField?.id) : safeName(`${formField?.id}-radio-option-${option?.value}`);

  const labelId = radioId ? `${radioId}-label` : null;
  const checked = groupValue === value;

  return (
    <div
      ref={labelledRadioButton}
      className={disabled ? 'disabled' : undefined}
      data-test-id={radioId}
      data-test-option={`radio-option-${option?.value}`}
      data-test-labelled-radio-button
    >
      <RadioButton
        value={value}
        groupValue={groupValue}
        name={name}
        changed={changedAction}
        radioId={radioId}
        disabled={disabled}
        ariaLabelledby={labelId}
        required={required}
        data-set-custom-validity
        ref={radioButtonElement}
      />
      <OptionLabelComponent
        optionLabelComponent={optionLabelComponent}
        option={option}
        optionLabelMarkdown={optionLabelMarkdown}
        label={label}
        for={radioId}
        labelId={labelId}
        checked={checked}
        changesetWebform={changesetWebform}
        formField={formField}
        data-test-class={optionLabelDataTestClass}
        ref={radioButtonLabel}
      />
    </div>
  );
}
