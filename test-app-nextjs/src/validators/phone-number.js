// BEGIN-SNIPPET phone-number-validator.js
// validators/phone-number.js
export default function validatePhoneNumber(opts = {}) {
  return (key, newValue, _oldValue, changes, content) => {
    if (!newValue || !newValue.length) {
      return 'Country code and number are required';
    }
    if (newValue.includes('()')) {
      return 'Country code is required';
    }
    const number = newValue.split(')')[1];
    if (!number || !number.length) {
      return 'Phone number may not be empty';
    }
    if (number.match(/[^\d ]+/)) {
      return 'Phone number may only contain numbers and spaces';
    }
    return true;
  };
}
//END-SNIPPET
