import buildMessage from '../utils-react/validation-errors';

/**
 * Validates that a value is present (non-empty) or absent (empty).
 *
 * Options:
 *   - `presence` {boolean}  true → must be present; false → must be blank. Required.
 *   - `ignoreBlank` {boolean}  if true, a whitespace-only string is treated as not present.
 *   - `on` {string|string[]}  only validate when one of these sibling fields has a value.
 *
 * @param {boolean|Object} options
 * @returns {Function}
 */
export default function validatePresence(options) {
  let targets;

  if (typeof options === 'boolean') {
    options = { presence: options };
  } else if (options && options.on !== undefined) {
    if (typeof options.on === 'string') {
      targets = [options.on];
    } else if (Array.isArray(options.on)) {
      targets = options.on;
    }

    // clone so we don't mutate the caller's object
    options = Object.assign({}, options);
    delete options.on;
  }

  return (key, value, _oldValue, changes = {}, content = {}) => {
    // `on` guard: skip validation unless one of the target fields has a value
    if (targets) {
      const anyTargetPresent = targets.some((target) => {
        const change = changes[target];
        return change !== undefined
          ? Boolean(change)
          : Boolean(content[target]);
      });

      if (!anyTargetPresent) {
        return true;
      }
    }

    const { presence, ignoreBlank } = options;

    const isPresent = ignoreBlank
      ? typeof value === 'string'
        ? value.trim().length > 0
        : value != null && value !== ''
      : value != null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0);

    if (presence === true && !isPresent) {
      return buildMessage(key, { type: 'blank', value, context: options });
    }

    if (presence === false && isPresent) {
      return buildMessage(key, { type: 'present', value, context: options });
    }

    return true;
  };
}
