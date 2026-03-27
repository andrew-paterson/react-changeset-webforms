'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChangesetWebform } from 'validated-changeset-webforms';
import { safeName } from 'validated-changeset-webforms';
import addonDefaults from '../utils/addon-defaults.js';
import appDefaults from '../utils/app-defaults.js';
import ValidatingField from './field-elements/ValidatingField.jsx';
import FormActions from './form-elements/FormActions.jsx';

import { FormField as _FormField } from 'validated-changeset-webforms';
import { FormFieldClone as _FormFieldClone } from 'validated-changeset-webforms';
import { FormSettings as _FormSettings } from 'validated-changeset-webforms';
import { Option as _Option } from 'validated-changeset-webforms';
import { Changeset } from 'validated-changeset';

const modules = {
  FormField: _FormField,
  FormFieldClone: _FormFieldClone,
  FormSettings: _FormSettings,
  Option: _Option,
  Changeset: Changeset,
};

/**
 * ChangesetWebform
 *
 * Top-level form component. Builds a ChangesetWebform instance on mount and
 * renders all fields plus form actions.
 *
 * Props:
 *  - formSchema                        {object}    The form schema definition.
 *  - data                              {object}    Initial field data.
 *  - debug                             {boolean}   Enable debug logging.
 *  - dynamicIncludeExcludeConditions   {any}       Passed through to ChangesetWebform.
 *  - onFormSubmit                      {Function}  Custom submit handler override.
 *  - afterGenerateChangesetWebform     {Function}  Called with the new webform instance.
 *  - afterFieldInserted                {Function}  Called after a field mounts.
 *  - afterFieldRemoved                 {Function}  Called after a field unmounts.
 *  - onUserInteraction                 {Function}  Called on any user interaction.
 *  - afterClickAddCloneButton          {Function}  Clone-group button callback.
 *  - requestInFlight                   {boolean}   Passed to form-fields wrapper attrs.
 *  - children                          {ReactNode} Yielded content rendered inside the form.
 *  - (callback props)                  onFieldValueChange, beforeResetForm, afterResetForm,
 *                                      beforeClearForm, afterClearForm, submitData,
 *                                      submitSuccess, submitError, submitComplete,
 *                                      afterFieldValidation, afterValidateFields,
 *                                      formValidationPassed, beforeSubmitForm,
 *                                      formValidationFailed
 */
export default function ChangesetWebformComp({
  formSchema,
  data,
  debug: debugProp,
  dynamicIncludeExcludeConditions,
  onFormSubmit: onFormSubmitOverride,
  afterGenerateChangesetWebform,
  afterFieldInserted: afterFieldInsertedProp,
  afterFieldRemoved: afterFieldRemovedProp,
  onUserInteraction: onUserInteractionProp,
  afterClickAddCloneButton,
  children,
  // Callbacks forwarded into the ChangesetWebform instance
  onFieldValueChange,
  beforeResetForm,
  afterResetForm,
  beforeClearForm,
  afterClearForm,
  submitData,
  submitSuccess,
  submitError,
  submitComplete,
  afterFieldValidation,
  afterValidateFields,
  formValidationPassed,
  beforeSubmitForm,
  formValidationFailed,
  ...rest
}) {
  const [changesetWebform, setChangesetWebform] = useState(null);
  // Keep a ref so callbacks always close over the latest instance without
  // causing the effect to re-run.
  const cwfRef = useRef(null);

  const debugMode = appDefaults?.debug || debugProp;

  useEffect(() => {
    const callbacks = {
      onFieldValueChange,
      beforeResetForm,
      afterResetForm,
      beforeClearForm,
      afterClearForm,
      submitData,
      submitSuccess,
      submitError,
      submitComplete,
      afterFieldValidation,
      afterValidateFields,
      formValidationPassed,
      beforeSubmitForm,
      formValidationFailed,
    };

    const instance = new ChangesetWebform(formSchema, data, {
      // appDefaults: [addonDefaults, appDefaults],
      appDefaults: [addonDefaults],
      dynamicIncludeExcludeConditions,
      onFormSubmit: onFormSubmitOverride,
      debug: debugMode,
      callbacks,
      modules,
    });

    if (debugMode) {
      console.log('[Changeset Webforms] DEBUG changesetWebform object', instance);
    }

    cwfRef.current = instance;
    setChangesetWebform(instance);

    if (afterGenerateChangesetWebform) {
      afterGenerateChangesetWebform(instance);
    }
    // Intentionally run only on mount — schema/data changes are not supported
    // as a re-init path; consumers should unmount/remount for that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = useCallback((event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    return cwfRef.current?.submit();
  }, []);

  const resetForm = useCallback(() => {
    cwfRef.current?.reset();
    // Force a re-render so fields reflect the rolled-back changeset.
    setChangesetWebform((prev) => (prev ? { ...prev } : prev));
  }, []);

  const clearForm = useCallback(() => {
    const cwf = cwfRef.current;
    if (!cwf) return;
    cwf.clear();
    if (cwf.formSettings?.submitAfterClear) {
      cwf.submit();
    }
    setChangesetWebform((prev) => (prev ? { ...prev } : prev));
  }, []);

  const afterFieldInserted = useCallback(
    (formField) => {
      if (afterFieldInsertedProp) {
        afterFieldInsertedProp(formField, cwfRef.current);
      }
    },
    [afterFieldInsertedProp],
  );

  const afterFieldRemoved = useCallback(
    (formField) => {
      if (afterFieldRemovedProp) {
        afterFieldRemovedProp(formField, cwfRef.current);
      }
    },
    [afterFieldRemovedProp],
  );

  const onUserInteraction = useCallback(
    (formField, eventName, value, event) => {
      if (onUserInteractionProp) {
        onUserInteractionProp(formField, cwfRef.current, eventName, value, event);
      }
    },
    [onUserInteractionProp],
  );

  if (!changesetWebform) {
    return <div />;
  }

  const { formSettings } = changesetWebform;

  return (
    <div
      className="changeset-webform"
      {...rest}
    >
      <form
        onSubmit={onFormSubmit}
        noValidate={formSettings?.novalidate}
        data-test-id={safeName(formSettings?.formName)}
      >
        <div>
          {changesetWebform.fields.map((formField) => (
            <ValidatingField
              key={formField.fieldId}
              formField={formField}
              changesetWebform={changesetWebform}
              dataTestFormName={formSettings?.dataTestFormName}
              afterClickAddCloneButton={afterClickAddCloneButton}
              formSettings={formSettings}
              formFields={changesetWebform.fields}
              onFormSubmit={onFormSubmit}
              onUserInteraction={onUserInteraction}
              afterFieldInserted={afterFieldInserted}
              afterFieldRemoved={afterFieldRemoved}
            />
          ))}
        </div>
        {children}
        <FormActions
          changesetWebform={changesetWebform}
          formSettings={formSettings}
          onFormSubmit={onFormSubmit}
          resetForm={resetForm}
          clearForm={clearForm}
        />
      </form>
    </div>
  );
}
