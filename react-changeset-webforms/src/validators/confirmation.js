import buildMessage from '../utils-react/validation-errors';

/**
 * Validates that a field's value matches the value of another field.
 *
 * Options:
 *   - `on`         {string}   (required) the field name to confirm against
 *   - `allowBlank` {boolean}  skip validation when value is empty
 *
 * @param {Object} options
 * @returns {Function}
 */
export default function validateConfirmation(options = {}) {
  return (key, newValue, _oldValue, changes = {}, content = {}) => {
    const { on, allowBlank } = options;

    if (!on) {
      throw new Error(
        `[validator:confirmation] [${key}] option 'on' is required`
      );
    }

    if (allowBlank && (newValue == null || newValue === '')) {
      return true;
    }

    // Combine content with changes so we check the latest value of the target
    // field (same logic as the original ember-changeset-validations validator)
    const model = Object.assign({}, content, changes);
    const confirmValue = model[on];

    if (newValue !== confirmValue) {
      return buildMessage(key, {
        type: 'confirmation',
        value: newValue,
        context: options,
      });
    }

    return true;
  };
}
