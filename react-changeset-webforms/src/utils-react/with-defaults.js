/**
 * Create a new object merging `defaults` with `obj`, where `obj` wins on
 * conflicts.  No Ember dependencies.
 *
 * @param {Object} obj
 * @param {Object} defaults
 * @returns {Object}
 */
export default function withDefaults(obj = {}, defaults = {}) {
  return Object.assign(Object.assign({}, defaults), obj);
}
