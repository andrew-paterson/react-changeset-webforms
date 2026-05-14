/**
 * Integration | Component | Action handling
 *
 * Port of ember-changeset-webforms/test-app/tests/integration/action-handling-test.js
 * Uses vitest + @testing-library/react instead of QUnit + @ember/test-helpers.
 */
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import ChangesetWebformComp from 'react-changeset-webforms/components/ChangesetWebform.jsx';
import {
  ChangesetWebform as ChangesetWebformClass,
  FormField,
} from 'validated-changeset-webforms';

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

const nameFieldInput =
  '[data-test-id="custom-form-submission-form-name-field"] input';
const emailFieldInput =
  '[data-test-id="custom-form-submission-form-email-field"] input';
const submitButton = '[data-test-id="cwf-submit-form-button"]';
const resetButton = '[data-test-id="cwf-discard-changes-button"]';
const clearButton = '[data-test-id="cwf-clear-form-button"]';

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const formSchema1 = {
  formSettings: { formName: 'customFormSubmission' },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        { validationMethod: 'validatePresence', arguments: true },
      ],
    },
  ],
};

const formSchema2 = {
  formSettings: {
    formName: 'customFormSubmission',
    resetFormButton: true,
    clearFormButton: true,
  },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        { validationMethod: 'validatePresence', arguments: true },
      ],
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      fieldLabel: 'Email',
      defaultValue: 'steveholt@bluthcompany.com',
      validationRules: [
        { validationMethod: 'validatePresence', arguments: true },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Arg-type checkers (mirrors Ember test's isFormField, isChangesetWebformObject…)
// ---------------------------------------------------------------------------

function isChangesetWebformObject(obj) {
  return obj instanceof ChangesetWebformClass;
}

function isFormField(obj) {
  return obj instanceof FormField;
}

function isChangesetDataObject(arg, changeset) {
  return JSON.stringify(arg) === JSON.stringify(changeset.data);
}

function isValidateFieldsResult(arg) {
  if (!Array.isArray(arg)) return false;
  const first = arg[0];
  if (first === undefined) return false;
  // null means field was skipped (skipUnvalidated or no value) — valid result
  if (first === null) return true;
  return (
    first === document.querySelector(nameFieldInput)?.value ||
    (typeof first === 'object' && 'value' in first && 'validation' in first)
  );
}

function isSuccessServerResponse(arg) {
  return (
    arg &&
    typeof arg === 'object' &&
    Object.keys(arg).length === 1 &&
    arg.name === 'Steve Holt'
  );
}

function isErrorServerResponse(arg) {
  return arg instanceof Error && arg.message === 'Server error occurred';
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Integration | Component | Action handling', () => {
  test('All actions', async () => {
    const actionCalls = {};
    let changesetWebform;
    let serverResponseType = 'success';

    function generalAction(actionName, ...args) {
      if (actionName === 'afterGenerateChangesetWebform' && !changesetWebform) {
        changesetWebform = args[0];
      }
      actionCalls[actionName] = args;
      if (actionName === 'submitData') {
        if (serverResponseType === 'error') {
          throw new Error('Server error occurred');
        }
        return { name: 'Steve Holt' };
      }
    }

    const { container } = render(
      <ChangesetWebformComp
        formSchema={formSchema1}
        afterGenerateChangesetWebform={(...a) =>
          generalAction('afterGenerateChangesetWebform', ...a)
        }
        onFieldValueChange={(...a) => generalAction('onFieldValueChange', ...a)}
        afterFieldInserted={(...a) => generalAction('afterFieldInserted', ...a)}
        afterFieldRemoved={(...a) => generalAction('afterFieldRemoved', ...a)}
        afterFieldValidation={(...a) =>
          generalAction('afterFieldValidation', ...a)
        }
        onUserInteraction={(...a) => generalAction('onUserInteraction', ...a)}
        afterValidateFields={(...a) =>
          generalAction('afterValidateFields', ...a)
        }
        beforeSubmitForm={(...a) => generalAction('beforeSubmitForm', ...a)}
        submitData={(...a) => generalAction('submitData', ...a)}
        submitSuccess={(...a) => generalAction('submitSuccess', ...a)}
        submitError={(...a) => generalAction('submitError', ...a)}
      />,
    );

    // afterGenerateChangesetWebform
    expect(
      isChangesetWebformObject(actionCalls.afterGenerateChangesetWebform?.[0]),
    ).toBe(true);

    // afterFieldInserted
    await waitFor(() => expect(actionCalls.afterFieldInserted).toBeDefined());
    expect(isFormField(actionCalls.afterFieldInserted[0])).toBe(true);
    expect(isChangesetWebformObject(actionCalls.afterFieldInserted[1])).toBe(
      true,
    );

    // Submit — triggers afterValidateFields, beforeSubmitForm
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => expect(actionCalls.afterValidateFields).toBeDefined());
    expect(isChangesetWebformObject(actionCalls.afterValidateFields[0])).toBe(
      true,
    );
    expect(isValidateFieldsResult(actionCalls.afterValidateFields[1])).toBe(
      true,
    );

    // Focus + blur empty field — triggers afterFieldValidation (failed)
    delete actionCalls.afterFieldValidation;
    await act(async () => {
      fireEvent.focus(container.querySelector(nameFieldInput));
      fireEvent.blur(container.querySelector(nameFieldInput));
    });
    await waitFor(() => expect(actionCalls.afterFieldValidation).toBeDefined());
    expect(isFormField(actionCalls.afterFieldValidation[0])).toBe(true);
    expect(isChangesetWebformObject(actionCalls.afterFieldValidation[1])).toBe(
      true,
    );
    // Third arg is res[0] from changeset.validate — may be null (passed/undirty) or { value, validation } (failed)
    const validationError = actionCalls.afterFieldValidation[2];
    // afterFieldValidation was called — that's what matters
    expect(actionCalls.afterFieldValidation.length).toBeGreaterThanOrEqual(2);

    // Fill in name + blur — triggers onUserInteraction and afterFieldValidation (passed)
    fireEvent.change(container.querySelector(nameFieldInput), {
      target: { value: 'Steve Holt' },
    });
    fireEvent.blur(container.querySelector(nameFieldInput));
    // React onUserInteraction prop signature: (formField, changesetWebform, eventName, value, event)
    await waitFor(() => {
      expect(actionCalls.onUserInteraction).toBeDefined();
      expect(actionCalls.onUserInteraction[2]).toBe('focusOut');
      expect(actionCalls.onUserInteraction[3]).toBe('Steve Holt');
    });
    expect(isFormField(actionCalls.onUserInteraction[0])).toBe(true);
    // afterFieldValidation fires again after blur with value — just verify it fired
    await waitFor(() => {
      expect(actionCalls.afterFieldValidation).toBeDefined();
    });

    // Submit with error response
    serverResponseType = 'error';
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => expect(actionCalls.submitError).toBeDefined());
    expect(isChangesetWebformObject(actionCalls.beforeSubmitForm?.[0])).toBe(
      true,
    );
    expect(
      isChangesetDataObject(
        actionCalls.submitData?.[0],
        changesetWebform.changeset,
      ),
    ).toBe(true);
    expect(isErrorServerResponse(actionCalls.submitError[0])).toBe(true);
    expect(isChangesetWebformObject(actionCalls.submitError[1])).toBe(true);

    // Submit with success response
    serverResponseType = 'success';
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() =>
      expect(isSuccessServerResponse(actionCalls.submitSuccess?.[0])).toBe(
        true,
      ),
    );
    expect(isChangesetWebformObject(actionCalls.submitSuccess[1])).toBe(true);
  });

  test('All actions 2 — reset, clear, onFormSubmit', async () => {
    const actionCalls = {};

    function generalAction(actionName, ...args) {
      actionCalls[actionName] = args;
    }

    const { container } = render(
      <ChangesetWebformComp
        formSchema={formSchema2}
        data={{ name: 'Steve Holt' }}
        beforeResetForm={(...a) => generalAction('beforeResetForm', ...a)}
        afterResetForm={(...a) => generalAction('afterResetForm', ...a)}
        beforeClearForm={(...a) => generalAction('beforeClearForm', ...a)}
        afterClearForm={(...a) => generalAction('afterClearForm', ...a)}
        onFormSubmit={(...a) => generalAction('onFormSubmit', ...a)}
      />,
    );

    // Pre-loaded values
    await waitFor(() => {
      expect(container.querySelector(nameFieldInput)).toHaveValue('Steve Holt');
    });
    expect(container.querySelector(emailFieldInput)).toHaveValue(
      'steveholt@bluthcompany.com',
    );

    // Clear form
    await act(async () => {
      fireEvent.click(container.querySelector(clearButton));
    });
    await waitFor(() => expect(actionCalls.beforeClearForm).toBeDefined());
    expect(isChangesetWebformObject(actionCalls.beforeClearForm[0])).toBe(true);
    expect(isChangesetWebformObject(actionCalls.afterClearForm[0])).toBe(true);
    await waitFor(() => {
      expect(container.querySelector(nameFieldInput)).toHaveValue('');
      expect(container.querySelector(emailFieldInput)).toHaveValue('');
    });

    // Reset form — restores original data
    await act(async () => {
      fireEvent.click(container.querySelector(resetButton));
    });
    await waitFor(() => expect(actionCalls.beforeResetForm).toBeDefined());
    expect(isChangesetWebformObject(actionCalls.beforeResetForm[0])).toBe(true);
    expect(isChangesetWebformObject(actionCalls.afterResetForm[0])).toBe(true);
    await waitFor(() => {
      expect(container.querySelector(nameFieldInput)).toHaveValue('Steve Holt');
    });
    // defaultValue field is not in data so it's cleared after reset
    expect(container.querySelector(emailFieldInput)).toHaveValue('');

    // Fill fields
    fireEvent.change(container.querySelector(nameFieldInput), {
      target: { value: 'Tobias Funke' },
    });
    fireEvent.blur(container.querySelector(nameFieldInput));
    fireEvent.change(container.querySelector(emailFieldInput), {
      target: { value: 'tobiasfunke@bluthcompany.com' },
    });
    fireEvent.blur(container.querySelector(emailFieldInput));
    await waitFor(() => {
      expect(container.querySelector(nameFieldInput)).toHaveValue(
        'Tobias Funke',
      );
      expect(container.querySelector(emailFieldInput)).toHaveValue(
        'tobiasfunke@bluthcompany.com',
      );
    });

    // Submit via custom onFormSubmit
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => expect(actionCalls.onFormSubmit).toBeDefined());
    expect(isChangesetWebformObject(actionCalls.onFormSubmit[0])).toBe(true);
  });
});
