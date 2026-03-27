import React, { useRef } from 'react';
import SubmitFormButton from './SubmitFormButton.jsx';
import ResetFormButton from './ResetFormButton.jsx';
import ClearFormButton from './ClearFormButton.jsx';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * FormActions
 *
 * Renders the form action buttons bar. Controls which buttons appear via
 * formSettings flags:
 *  - Submit button  — always shown unless `formSettings.hideSubmitButton` is true.
 *  - Reset button   — shown when `formSettings.resetFormButton` is true.
 *  - Clear button   — shown when `formSettings.clearFormButton` is true.
 *
 * Props:
 *  - onFormSubmit      {Function}  Passed to SubmitFormButton.
 *  - resetForm         {Function}  Passed to ResetFormButton.
 *  - clearForm         {Function}  Passed to ClearFormButton.
 *  - changesetWebform  {object}    Parent webform instance.
 *  - formSettings      {object}    Form-level settings object.
 */
export default function FormActions({ onFormSubmit, resetForm, clearForm, changesetWebform, formSettings }) {
  const formActionsRef = useRef(null);
  useAttrsFromConfig(formActionsRef, 'formActions', changesetWebform);

  return (
    <div
      ref={formActionsRef}
      data-test-id="cwf-form-actions"
    >
      {!formSettings?.hideSubmitButton && (
        <SubmitFormButton
          onFormSubmit={onFormSubmit}
          changesetWebform={changesetWebform}
          formSettings={formSettings}
        />
      )}
      {formSettings?.resetFormButton && (
        <ResetFormButton
          resetForm={resetForm}
          changesetWebform={changesetWebform}
          formSettings={formSettings}
        />
      )}
      {formSettings?.clearFormButton && (
        <ClearFormButton
          clearForm={clearForm}
          changesetWebform={changesetWebform}
          formSettings={formSettings}
        />
      )}
    </div>
  );
}
