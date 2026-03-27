import buildMessage from '../utils-react/validation-errors';
import withDefaults from '../utils-react/with-defaults';

/**
 * Validates various numeric properties of a value.
 *
 * Options:
 *   - `allowBlank`  {boolean}  skip validation when value is empty
 *   - `allowNone`   {boolean}  skip when value is null/undefined (default: true)
 *   - `allowString` {boolean}  accept string representations of numbers (default: true)
 *   - `integer`     {boolean}  must be an integer
 *   - `positive`    {boolean}  must be >= 0
 *   - `odd`         {boolean}  must be odd
 *   - `even`        {boolean}  must be even
 *   - `is`          {number}   must equal this value exactly
 *   - `lt`          {number}   must be less than
 *   - `lte`         {number}   must be less than or equal to
 *   - `gt`          {number}   must be greater than
 *   - `gte`         {number}   must be greater than or equal to
 *   - `multipleOf`  {number}   must be a multiple of this value
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateNumber(options = {}) {
  options = withDefaults(options, { allowString: true, allowNone: false });

  if (options.allowBlank) {
    options = Object.assign({}, options, { allowNone: true });
  }

  return (key, value) => {
    const { allowBlank, allowNone = true, allowString, integer } = options;

    if (allowNone && value == null) {
      return true;
    }

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    if (isEmpty(value)) {
      return buildMessage(key, { type: 'notANumber', value, context: options });
    }

    if (typeof value === 'string' && !allowString) {
      return buildMessage(key, { type: 'notANumber', value, context: options });
    }

    const numValue = Number(value);

    if (!isNumber(numValue)) {
      return buildMessage(key, { type: 'notANumber', value, context: options });
    }

    if (integer && !isInteger(numValue)) {
      return buildMessage(key, {
        type: 'notAnInteger',
        value,
        context: options,
      });
    }

    const optionKeys = Object.keys(options);

    for (let i = 0; i < optionKeys.length; i++) {
      const type = optionKeys[i];
      const result = validateType(type, options, numValue, key, value);

      if (typeof result !== 'boolean') {
        return result;
      }
    }

    return true;
  };
}

function validateType(type, options, numValue, key, value) {
  const expected = options[type];

  if (type === 'is' && numValue !== expected) {
    return buildMessage(key, {
      type: 'equalTo',
      value,
      context: options,
    });
  } else if (type === 'lt' && numValue >= expected) {
    return buildMessage(key, {
      type: 'lessThan',
      value,
      context: options,
    });
  } else if (type === 'lte' && numValue > expected) {
    return buildMessage(key, {
      type: 'lessThanOrEqualTo',
      value,
      context: options,
    });
  } else if (type === 'gt' && numValue <= expected) {
    return buildMessage(key, {
      type: 'greaterThan',
      value,
      context: options,
    });
  } else if (type === 'gte' && numValue < expected) {
    return buildMessage(key, {
      type: 'greaterThanOrEqualTo',
      value,
      context: options,
    });
  } else if (type === 'positive' && numValue < 0) {
    return buildMessage(key, {
      type: 'positive',
      value,
      context: options,
    });
  } else if (type === 'odd' && (!isInteger(numValue) || numValue % 2 === 0)) {
    return buildMessage(key, {
      type: 'odd',
      value,
      context: options,
    });
  } else if (type === 'even' && (!isInteger(numValue) || numValue % 2 !== 0)) {
    return buildMessage(key, {
      type: 'even',
      value,
      context: options,
    });
  } else if (type === 'multipleOf' && !isInteger(numValue / expected)) {
    return buildMessage(key, {
      type: 'multipleOf',
      value,
      context: options,
    });
  }

  return true;
}

function isEmpty(value) {
  return value == null || value === '';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isInteger(value) {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
}
