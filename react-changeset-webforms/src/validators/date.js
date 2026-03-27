import buildMessage from '../utils-react/validation-errors';
import withDefaults from '../utils-react/with-defaults';
import toDate from '../utils-react/to-date';

/**
 * Validates that a value is a valid Date, optionally comparing it against
 * before/after bounds.
 *
 * Accepts valid Date objects or a Date represented as milliseconds since
 * 1 Jan 1970, or a function returning either.  Strings are not supported
 * (use `Date.parse` first).
 *
 * Options:
 *   - `allowBlank` {boolean}       skip validation when value is null/undefined
 *   - `before`     {Date|number|Function}  value must be strictly before this date
 *   - `onOrBefore` {Date|number|Function}  value must be on or before this date
 *   - `after`      {Date|number|Function}  value must be strictly after this date
 *   - `onOrAfter`  {Date|number|Function}  value must be on or after this date
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateDate(options = {}) {
  options = withDefaults(options, {
    allowBlank: false,
  });

  return (key, value) => {
    const { allowBlank, before, onOrBefore, after, onOrAfter } = options;
    let { message } = options;

    if (allowBlank && (value === undefined || value === null)) {
      return true;
    }

    const date = toDate(value);

    if (!isValidDate(date)) {
      return buildMessage(key, {
        type: 'date',
        value: 'not a date',
        context: { value, message },
      });
    }

    if (before != null) {
      const beforeDate = toDate(before);
      message = message || `[BEFORE] date is NOT before ${value}`;

      if (date >= beforeDate) {
        return buildMessage(key, {
          type: 'before',
          value,
          context: { before: beforeDate, message },
        });
      }
    }

    if (onOrBefore != null) {
      const onOrBeforeDate = toDate(onOrBefore);
      message = message || `[ON OR BEFORE] date is NOT on or before ${value}`;

      if (date > onOrBeforeDate) {
        return buildMessage(key, {
          type: 'onOrBefore',
          value,
          context: { onOrBefore: onOrBeforeDate, message },
        });
      }
    }

    if (after != null) {
      const afterDate = toDate(after);
      message = message || `[AFTER] date is NOT after ${value}`;

      if (date <= afterDate) {
        return buildMessage(key, {
          type: 'after',
          value,
          context: { after: afterDate, message },
        });
      }
    }

    if (onOrAfter != null) {
      const onOrAfterDate = toDate(onOrAfter);
      message = message || `[ON OR AFTER] date is NOT on or after ${value}`;

      if (date < onOrAfterDate) {
        return buildMessage(key, {
          type: 'onOrAfter',
          value,
          context: { onOrAfter: onOrAfterDate, message },
        });
      }
    }

    return true;
  };
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
