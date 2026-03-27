/**
 * Handles an array of validators and returns a Promise when any result is a
 * Promise, otherwise returns synchronously.  No Ember dependencies.
 *
 * Rejects `true` values from the results array. Returns `true` when there are
 * no errors, or the array of error values when there are failures.
 *
 * @param {Array<Function>} validators
 * @param {Object} options
 * @param {string} options.key
 * @param {*} options.newValue
 * @param {*} options.oldValue
 * @param {Object} options.changes
 * @param {Object} options.content
 * @returns {Promise<boolean|Array>|boolean|Array}
 */
export default function handleMultipleValidations(
  validators,
  { key, newValue, oldValue, changes, content }
) {
  const validations = validators.map((validator) =>
    validator(key, newValue, oldValue, changes, content)
  );

  const hasPromise = validations.some(
    (v) => v != null && typeof v === 'object' && typeof v.then === 'function'
  );

  if (hasPromise) {
    return Promise.all(validations).then(handleValidations);
  }

  return handleValidations(validations);
}

/**
 * @param {Array} validations
 * @returns {boolean|Array}
 */
function handleValidations(validations = []) {
  const rejected = validations.filter(
    (v) => !(typeof v === 'boolean' && v === true)
  );
  return rejected.length === 0 || rejected;
}
