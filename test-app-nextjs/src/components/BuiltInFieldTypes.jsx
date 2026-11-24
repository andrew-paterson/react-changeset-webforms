'use client';

import addonDefaults from 'react-changeset-webforms/src/utils/addon-defaults.js';

export default function BuiltInFieldTypes() {
  return (
    <>
      <p>
        The {addonDefaults.fieldTypes.length} built in fields have the
        following <code>fieldTypes</code>:
      </p>
      <ul>
        {addonDefaults.fieldTypes.map((fieldType) => (
          <li key={fieldType.fieldType}>
            <code>{fieldType.fieldType}</code>
          </li>
        ))}
      </ul>
    </>
  );
}
