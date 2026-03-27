/**
 * Builds a validation error message string (or raw error object when rawOutput
 * is configured).  No Ember dependencies.
 *
 * Usage:
 *   import buildMessage from '.../utils-react/validation-errors';
 *   return buildMessage(key, { type: 'blank', value, context: options });
 *
 * To enable raw output (returns structured object instead of string), pass
 * `{ rawOutput: true }` as the third argument or configure it once via
 * `configureRawOutput(true)`.
 */

import messages from './messages';

let _rawOutputDefault = false;

/**
 * Override the global raw-output default.  Equivalent to setting
 * `ENV['changeset-validations'] = { rawOutput: true }` in an Ember app.
 *
 * @param {boolean} value
 */
export function configureRawOutput(value) {
  _rawOutputDefault = Boolean(value);
}

/**
 * @param {string} key  - The field/attribute name being validated
 * @param {Object} result
 * @param {string} result.type     - Error type key (e.g. 'blank', 'tooShort')
 * @param {*}      result.value    - The value that failed validation
 * @param {Object} [result.context] - Options passed to the validator
 * @param {string} [result.message] - Pre-built message override
 * @param {Object} [opts]
 * @param {boolean} [opts.rawOutput] - Override the global raw-output flag
 * @returns {string|Object}
 */
export default function buildMessage(key, result, opts = {}) {
  const rawOutput =
    opts.rawOutput !== undefined ? opts.rawOutput : _rawOutputDefault;

  const description = messages.getDescriptionFor(key);

  if (result.message) {
    return result.message;
  }

  const { type, value, context = {} } = result;

  const messageTemplate = messages[type];

  if (rawOutput) {
    return {
      value,
      type,
      message: messageTemplate,
      context: Object.assign({}, context, { description }),
    };
  }

  if (context.message) {
    const msg = context.message;

    if (typeof msg === 'function') {
      const built = msg(key, type, value, context);
      if (typeof built !== 'string') {
        throw new Error('Custom message function must return a string');
      }
      return built;
    }

    return messages.formatMessage(msg, Object.assign({ description }, context));
  }

  return messages.formatMessage(
    messageTemplate,
    Object.assign({ description }, context)
  );
}
