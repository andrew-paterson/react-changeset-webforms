import React, { useCallback } from 'react';

/**
 * RadioButtonInput
 *
 * Low-level `<input type="radio">` element. Fires `changed(value)` when the
 * input changes and the new value differs from the current `groupValue`.
 *
 * Adapted from https://github.com/yapplabs/ember-radio-button
 *
 * Props:
 *  - value       {any}       The value this radio button represents.
 *  - groupValue  {any}       The currently selected value in the group.
 *  - checked     {boolean}   Controlled checked state.
 *  - changed     {Function}  Called with `value` when selection changes.
 *  - required    {boolean}
 *  - ...rest                 Spread onto <input> (id, name, disabled, etc.).
 */
export default function RadioButtonInput({ value, groupValue, checked, changed, required, ...rest }) {
  // aria-checked must be a string or absent — mirrors get checkedStr()
  const checkedStr = typeof checked === 'boolean' ? checked.toString() : undefined;

  const handleChange = useCallback(() => {
    if (groupValue !== value) {
      changed?.(value);
    }
  }, [groupValue, value, changed]);

  return (
    <input
      type="radio"
      checked={checked}
      aria-checked={checkedStr}
      value={value}
      required={required}
      onChange={handleChange}
      {...rest}
    />
  );
}
