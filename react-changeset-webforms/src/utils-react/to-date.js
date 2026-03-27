/**
 * `toDate` – converts a Date instance, a ms-since-epoch number, or a function
 * returning either of those into a Date object.  Strings are not supported
 * (use `Date.parse` first).  No Ember dependencies.
 *
 * @param {Date|number|Function} argument
 * @returns {Date}
 */
export default function toDate(argument) {
  if (typeof argument === 'function') {
    argument = argument();
  }

  const argStr = Object.prototype.toString.call(argument);

  if (
    argument instanceof Date ||
    (typeof argument === 'object' && argStr === '[object Date]')
  ) {
    return argument;
  }

  if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  }

  if (typeof argument === 'string' || argStr === '[object String]') {
    // eslint-disable-next-line no-console
    console.warn(
      'toDate: please use `Date.parse` to convert strings to dates.'
    );
    // eslint-disable-next-line no-console
    console.warn(new Error().stack);
  }

  return new Date(NaN);
}
