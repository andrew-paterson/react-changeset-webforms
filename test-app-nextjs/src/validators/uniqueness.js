// BEGIN-SNIPPET uniqueness-validator.js
// validators/uniqueness.js
// Will not work correctly if the changeset is empty.
export default function validateUniqueness(opts = {}) {
  return (key, newValue, _oldValue, changes, content) => {
    var current = Object.assign(content, changes);
    var response = true;
    opts.descriptionsMap = opts.descriptionsMap || {};
    const fieldName = opts.descriptionsMap[key] || key;
    for (var itemKey in current) {
      const otherfieldName = opts.descriptionsMap[itemKey] || itemKey;
      if (current[itemKey] === newValue && itemKey !== key) {
        response = `The ${fieldName} field must be unique, but it is the same as ${otherfieldName}.`;
      }
    }
    return response;
  };
}
//END-SNIPPET
