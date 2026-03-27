import buildMessage from '../utils-react/validation-errors';

/**
 * Validates that a value is a member of a given list or numeric range.
 *
 * Options:
 *   - `list`       {Array}   the value must be in this list (alias: `in`)
 *   - `range`      {[min, max]}  the value must satisfy min <= value <= max
 *   - `allowBlank` {boolean}  skip validation when value is empty
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateInclusion(options = {}) {
  // `list` is a user-facing alias for the internal `in` key
  const normalised = options.list
    ? Object.assign({}, options, { in: options.list })
    : options;

  return (key, value) => {
    const { in: array, range, allowBlank } = normalised;

    if (allowBlank && (value == null || value === '')) {
      return true;
    }

    if (array && array.indexOf(value) === -1) {
      return buildMessage(key, {
        type: 'inclusion',
        value,
        context: normalised,
      });
    }

    if (range && range.length === 2) {
      const [min, max] = range;
      const sameType =
        typeof value === typeof min && typeof value === typeof max;
      const isNaNValue = typeof value === 'number' && isNaN(value);

      if (!sameType || isNaNValue || min > value || value > max) {
        return buildMessage(key, {
          type: 'inclusion',
          value,
          context: normalised,
        });
      }
    }

    return true;
  };
}
