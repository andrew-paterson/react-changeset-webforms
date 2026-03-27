export function validatePresence(options) {
  return (_key, newValue, _oldValue, changes, content) => {
    console.log('validatePresence', { options, newValue, content });
    var response = true;
    if (options && options.presence) {
      if (typeof newValue === 'string' && newValue.trim() === '') {
        response = 'This field is required';
      } else if (newValue === null || newValue === undefined) {
        response = 'This field is required';
      }
    }
    return response;
  };
}
