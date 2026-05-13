import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import { useRef } from 'react';

export default function ClearSelect({ formField, changesetWebform, clear }) {
  const clearButtonRef = useRef(null);

  useAttrsFromConfig(
    clearButtonRef,
    'selectClearButton',
    changesetWebform,
    formField,
  );

  return (
    formField.allowClear === true &&
    formField.fieldValue != null && (
      <button
        data-test-id="clear-select-button"
        ref={clearButtonRef}
        onClick={clear}
      >
        Clear
      </button>
    )
  );
}
