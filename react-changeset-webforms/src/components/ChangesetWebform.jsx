import { useState, useCallback, useEffect, useRef } from 'react';
import { ChangesetWebform } from 'validated-changeset-webforms';
import { safeName } from 'validated-changeset-webforms';
import addonDefaults from '../utils/addon-defaults.js';
import { useChangesetWebformsConfig } from '../context/ChangesetWebformsContext.jsx';
import ValidatingField from './field-elements/ValidatingField.jsx';
import FormActions from './form-elements/FormActions.jsx';
import useAttrsFromConfig from '../hooks/use-attrs-from-config.js';
import filterHtmlProps from '../utils/filter-html-props.js';

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
  // Incremented on reset/clear so ValidatingField components are remounted,
  // causing didInsert to fire and re-initialising field eventLogs.
  const [resetCount, setResetCount] = useState(0);
  // Keep a ref so callbacks always close over the latest instance without
  // causing the effect to re-run.
  const cwfRef = useRef(null);

  const appDefaults = useChangesetWebformsConfig();

  const formWrapperRef = useRef(null);
  const formElementRef = useRef(null);
  const formFieldsRef = useRef(null);

  useAttrsFromConfig(formWrapperRef, 'formWrapper', changesetWebform);
  useAttrsFromConfig(formElementRef, 'formElement', changesetWebform);
  useAttrsFromConfig(formFieldsRef, 'formFields', changesetWebform);

  const debugMode = appDefaults?.debug || debugProp;

  useEffect(() => {
    const callbacks = {
      onFieldValueChange: async (formField, cwf) => {
        if (onFieldValueChange) {
          await onFieldValueChange(formField, cwf);
        }
        // Always trigger a re-render after any field value change — the
        // underlying class may have mutated isOmitted, fieldValue, etc. on
        // any field (e.g. via condition-based omission in _checkOmitted).
        setChangesetWebform((prev) => (prev ? { ...prev } : prev));
      },
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
      appDefaults: [addonDefaults, appDefaults],
      dynamicIncludeExcludeConditions,
      onFormSubmit: onFormSubmitOverride,
      debug: debugMode,
      callbacks,
      modules,
    });

    if (debugMode) {
      console.log(
        '[Changeset Webforms] DEBUG changesetWebform object',
        instance,
      );
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
    const result = cwfRef.current?.submit();
    // submit() is async — it validates all fields, mutating formField instances.
    // Force a re-render once it resolves so every ValidatingField re-reads
    // formField.validationErrors and passes the updated array down to FieldErrors.
    if (result && typeof result.then === 'function') {
      // Re-render immediately so requestInFlight=true is visible while in-flight,
      // then again on resolution so requestInFlight=false is reflected.
      setTimeout(() => {
        setChangesetWebform((prev) => (prev ? { ...prev } : prev));
      }, 0);
      result.then(() =>
        setChangesetWebform((prev) => (prev ? { ...prev } : prev)),
      );
    }
    return result;
  }, []);

  const resetForm = useCallback(() => {
    cwfRef.current?.reset();
    setResetCount((n) => n + 1);
    // Spread the live instance (not prev) so the fresh fields array from
    // setChangesetWebformProps is captured rather than the previous snapshot.
    setChangesetWebform(cwfRef.current ? { ...cwfRef.current } : null);
  }, []);

  const clearForm = useCallback(() => {
    const cwf = cwfRef.current;
    if (!cwf) return;
    cwf.clear();
    if (cwf.formSettings?.submitAfterClear) {
      cwf.submit();
    }
    setResetCount((n) => n + 1);
    // Same: spread the live instance so fresh fields are captured.
    setChangesetWebform({ ...cwf });
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
        onUserInteractionProp(
          formField,
          cwfRef.current,
          eventName,
          value,
          event,
        );
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
      ref={formWrapperRef}
      className="changeset-webform"
      {...filterHtmlProps(rest)}
    >
      <form
        ref={formElementRef}
        onSubmit={onFormSubmit}
        noValidate={formSettings?.novalidate}
        data-test-id={safeName(formSettings?.formName)}
      >
        <div ref={formFieldsRef}>
          {changesetWebform.fields.map((formField) => (
            <ValidatingField
              key={`${formField.fieldId}-${resetCount}`}
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
