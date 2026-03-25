import React, { useCallback } from 'react';
import RadioButtonInput from './RadioButtonInput.jsx';

/**
 * RadioButton
 *
 * Thin wrapper around RadioButtonInput that derives `checked` from
 * `groupValue === value` (using strict equality, matching Ember's `isEqual`
 * for primitives) and forwards a `changed` callback.
 *
 * Adapted from https://github.com/yapplabs/ember-radio-button
 *
 * Props:
 *  - value           {any}       The value this radio button represents.
 *  - groupValue      {any}       The currently selected value in the group.
 *  - changed         {Function}  Called with the new value when selected.
 *  - radioId         {string}    id applied to the input.
 *  - disabled        {boolean}
 *  - required        {boolean}
 *  - name            {string}
 *  - autofocus       {boolean}
 *  - tabindex        {number}
 *  - ariaLabelledby  {string}
 *  - ariaDescribedby {string}
 *  - ...rest                     Spread onto RadioButtonInput / <input>.
 */
export default function RadioButton({ value, groupValue, changed, radioId, disabled, required, name, autofocus, tabindex, ariaLabelledby, ariaDescribedby, ...rest }) {
  const checked = groupValue === value;

  const handleChanged = useCallback(
    (newValue) => {
      changed?.(newValue);
    },
    [changed],
  );

  return (
    <RadioButtonInput
      id={radioId}
      autoFocus={autofocus}
      disabled={disabled}
      name={name}
      required={required}
      tabIndex={tabindex}
      groupValue={groupValue}
      checked={checked}
      value={value}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      changed={handleChanged}
      {...rest}
    />
  );
}
