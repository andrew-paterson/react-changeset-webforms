export function validatePresence() {
  return (_key, newValue, _oldValue, changes, content) => {
    console.log('validatePresence', { newValue, changes, content });
    return 'Test';
  };
}
