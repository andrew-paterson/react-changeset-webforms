import buildMessage from '../utils-react/validation-errors';

// Built-in regular expressions matching ember-validators/format
/* eslint-disable no-useless-escape */
export const regularExpressions = {
  email:
    /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  phone:
    /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
  url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/,
};
/* eslint-enable no-useless-escape */

/**
 * Validates a String against a regular expression or a built-in format type.
 *
 * Options:
 *   - `type`        {'email'|'phone'|'url'}  use a built-in regex
 *   - `regex`       {RegExp}                 custom regular expression
 *   - `allowBlank`  {boolean}                skip validation when value is empty
 *   - `inverse`     {boolean}                pass when the value does NOT match
 *   - `allowNonTld` {boolean}                (email) allow addresses without a TLD
 *   - `minTldLength` {number}                (email) minimum TLD length
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateFormat(options = {}) {
  const hasOptions = Object.keys(options).length > 0;

  return (key, value) => {
    if (!hasOptions) {
      return true;
    }

    const { type, inverse = false, allowBlank } = options;
    let { regex } = options;

    if (allowBlank && (value == null || value === '')) {
      return true;
    }

    if (type && !regex && regularExpressions[type]) {
      regex = regularExpressions[type];
    }

    if (type === 'email' && regex === regularExpressions.email) {
      regex = buildEmailRegex(options);
    }

    const canMatch =
      typeof value === 'string' ||
      (value != null && typeof value.match === 'function');

    const matched = canMatch && regex ? value.match(regex) != null : false;

    if (!canMatch || (regex && matched === inverse)) {
      return buildMessage(key, {
        type: type || 'invalid',
        value,
        context: Object.assign({}, options, { regex }),
      });
    }

    return true;
  };
}

function buildEmailRegex(options) {
  let { source } = regularExpressions.email;
  const { allowNonTld, minTldLength } = options;

  if (minTldLength != null && typeof minTldLength === 'number') {
    source = source.replace(
      '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$',
      `[a-z0-9]{${minTldLength},}(?:[a-z0-9-]*[a-z0-9])?$`
    );
  }

  if (allowNonTld) {
    source = source.replace(
      '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)',
      '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.?)'
    );
  }

  return new RegExp(source, 'i');
}
