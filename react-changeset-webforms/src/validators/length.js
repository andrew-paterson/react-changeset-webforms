import buildMessage from '../utils-react/validation-errors';
import withDefaults from '../utils-react/with-defaults';

/**
 * Validates the length of a String or Array.
 *
 * Options:
 *   - `min` {number}       minimum length
 *   - `max` {number}       maximum length
 *   - `is`  {number}       exact length
 *   - `allowBlank` {boolean}  skip validation when value is empty
 *   - `allowNone`  {boolean}  skip validation when value is null/undefined (default: true)
 *   - `useBetweenMessage` {boolean}  use the 'between' message when both min and max are set (default: true)
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateLength(options = {}) {
  options = withDefaults(options, { useBetweenMessage: true });

  return (key, value) => {
    const {
      allowNone = true,
      allowBlank,
      useBetweenMessage,
      is,
      min,
      max,
    } = options;

    if (value == null) {
      return allowNone
        ? true
        : buildMessage(key, { type: 'invalid', value, context: options });
    }

    if (
      allowBlank &&
      (value === '' || (Array.isArray(value) && value.length === 0))
    ) {
      return true;
    }

    const length = value.length;

    if (is != null && is !== length) {
      return buildMessage(key, {
        type: 'wrongLength',
        value,
        context: options,
      });
    }

    if (useBetweenMessage && min != null && max != null) {
      if (length < min || length > max) {
        return buildMessage(key, { type: 'between', value, context: options });
      }
    } else {
      if (min != null && length < min) {
        return buildMessage(key, { type: 'tooShort', value, context: options });
      }

      if (max != null && length > max) {
        return buildMessage(key, { type: 'tooLong', value, context: options });
      }
    }

    return true;
  };
}
