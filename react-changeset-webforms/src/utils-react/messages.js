/**
 * Default validation messages for react-compatible validators.
 * No Ember dependencies.
 */

const _regex = /\{(\w+)\}/g;

/**
 * Converts a camelCase or snake_case or dash-case key into a human-readable
 * description, e.g. "firstName" → "First name", "first_name" → "First name".
 *
 * @param {string} key
 * @returns {string}
 */
function getDescriptionFor(key = '') {
  if (!key) return 'This field';
  const words = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .split(/\s+/);
  return words
    .map((w, i) =>
      i === 0
        ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        : w.toLowerCase()
    )
    .join(' ');
}

/**
 * Replace `{placeholder}` tokens in a message string with values from context.
 *
 * @param {string} message
 * @param {Object} context
 * @returns {string}
 */
function formatMessage(message, context = {}) {
  let m = message;
  if (m == null || typeof m !== 'string') {
    m = messages.invalid;
  }
  return m.replace(_regex, (_match, attr) => {
    const val = context[attr];
    return val != null ? String(val) : '';
  });
}

const messages = {
  _regex,
  getDescriptionFor,
  formatMessage,

  // --- message templates (mirrors ember-validators messages + changeset-validations overrides) ---
  accepted: '{description} must be accepted',
  after: '{description} must be after {after}',
  before: '{description} must be before {before}',
  // ember-changeset-validations flips blank/present relative to ember-validators
  blank: "{description} can't be blank",
  present: '{description} must be blank',
  collection: '{description} must be a collection',
  confirmation: "{description} doesn't match {on}",
  date: '{description} must be a valid date',
  email: '{description} must be a valid email address',
  empty: "{description} can't be empty",
  equalTo: '{description} must be equal to {is}',
  even: '{description} must be even',
  exclusion: '{description} is reserved',
  greaterThan: '{description} must be greater than {gt}',
  greaterThanOrEqualTo: '{description} must be greater than or equal to {gte}',
  inclusion: '{description} is not included in the list',
  invalid: '{description} is invalid',
  lessThan: '{description} must be less than {lt}',
  lessThanOrEqualTo: '{description} must be less than or equal to {lte}',
  notAnInteger: '{description} must be an integer',
  notANumber: '{description} must be a number',
  odd: '{description} must be odd',
  onOrAfter: '{description} must be on or after {onOrAfter}',
  onOrBefore: '{description} must be on or before {onOrBefore}',
  otherThan: '{description} must be other than {value}',
  phone: '{description} must be a valid phone number',
  positive: '{description} must be positive',
  multipleOf: '{description} must be a multiple of {multipleOf}',
  singular: "{description} can't be a collection",
  tooLong: '{description} is too long (maximum is {max} characters)',
  tooShort: '{description} is too short (minimum is {min} characters)',
  between: '{description} must be between {min} and {max} characters',
  url: '{description} must be a valid url',
  wrongLength: '{description} is the wrong length (should be {is} characters)',
};

export default messages;
