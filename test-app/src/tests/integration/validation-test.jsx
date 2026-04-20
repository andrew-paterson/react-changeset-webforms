/**
 * Integration | Component | Validation events
 *
 * Port of ember-changeset-webforms/test-app/tests/integration/validation-test.js
 * Uses vitest + @testing-library/react instead of QUnit + @ember/test-helpers.
 */
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ChangesetWebformComp from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

const nameField = '[data-test-id="validation-events-form-name-field"]';
const emailField = '[data-test-id="validation-events-form-email-field"]';
const phoneField = '[data-test-id="validation-events-form-phone-number-field"]';
const nameInput = `${nameField} input`;
const emailInput = `${emailField} input`;
const phoneInput = `${phoneField} input`;

const invalidClass = 'is-invalid';
const validClass = 'is-valid';
const fieldErrorSelector = '[data-test-class="cwf-field-error"]';

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const baseSchema = {
  formSettings: { formName: 'validationEvents', hideSubmitButton: true },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        { validationMethod: 'validatePresence', arguments: { presence: true } },
      ],
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      inputType: 'email',
      fieldLabel: 'Email',
      validatesOn: ['keyUp'],
      validationRules: [
        { validationMethod: 'validatePresence', arguments: { presence: true } },
        { validationMethod: 'validateFormat', arguments: { type: 'email' } },
      ],
    },
    {
      fieldId: 'phoneNumber',
      fieldType: 'input',
      fieldLabel: 'Phone number',
      validatesOn: ['$inherited', 'keyUp'],
      validationRules: [
        { validationMethod: 'validatePresence', arguments: { presence: true } },
        { validationMethod: 'validateLength', arguments: { min: 3, max: 15 } },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function q(container, sel) {
  return container.querySelector(sel);
}

function firstFormControl(container, fieldSel) {
  return q(container, `${fieldSel} .form-control`);
}

async function waitForInvalidClass(container, fieldSel) {
  await waitFor(() => {
    const el = firstFormControl(container, fieldSel);
    expect(el).not.toBeNull();
    expect(el.classList.contains(invalidClass)).toBe(true);
  });
}

async function waitForValidClass(container, fieldSel) {
  await waitFor(() => {
    const el = firstFormControl(container, fieldSel);
    expect(el).not.toBeNull();
    expect(el.classList.contains(validClass)).toBe(true);
  });
}

async function waitForNoValidationClass(container, fieldSel) {
  await waitFor(() => {
    const el = firstFormControl(container, fieldSel);
    expect(el).not.toBeNull();
    expect(el.classList.contains(invalidClass)).toBe(false);
    expect(el.classList.contains(validClass)).toBe(false);
  });
}

function hasErrors(container, fieldSel) {
  return (
    container.querySelectorAll(`${fieldSel} ${fieldErrorSelector}`).length >= 1
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Integration | Component | Validation events', () => {
  test('Validation events', async () => {
    const { container } = render(
      <ChangesetWebformComp formSchema={baseSchema} />,
    );

    // Name field: focus then blur (empty) → fails validation with default events
    await act(async () => {
      fireEvent.focus(q(container, nameInput));
      fireEvent.blur(q(container, nameInput));
    });
    await waitForInvalidClass(container, nameField);
    expect(hasErrors(container, nameField)).toBe(true);

    // Focus name field again → loses invalid state (focussed clears validation UI)
    fireEvent.focus(q(container, nameInput));
    await waitForNoValidationClass(container, nameField);

    // Fill in and keyUp on name → should NOT validate (keyUp is not a default event)
    fireEvent.change(q(container, nameInput), {
      target: { value: 'Steve Holt' },
    });
    fireEvent.keyUp(q(container, nameInput), { keyCode: 1 });
    await waitFor(() => {
      const el = firstFormControl(container, nameField);
      expect(el.classList.contains(validClass)).toBe(false);
    });

    // Blur name (with value) → passes validation
    fireEvent.blur(q(container, nameInput));
    await waitForValidClass(container, nameField);

    // Email field: focus + blur (empty) → should NOT validate (only keyUp events)
    fireEvent.focus(q(container, emailInput));
    fireEvent.blur(q(container, emailInput));
    await waitForNoValidationClass(container, emailField);

    // Type invalid email + keyUp → fails validation
    fireEvent.change(q(container, emailInput), { target: { value: 's' } });
    fireEvent.keyUp(q(container, emailInput), { keyCode: 1 });
    await waitForInvalidClass(container, emailField);
    expect(hasErrors(container, emailField)).toBe(true);

    // Focus email field again → does NOT lose invalid state (no showValidationWhenFocussed config)
    fireEvent.blur(q(container, emailInput));
    fireEvent.focus(q(container, emailInput));
    await waitForInvalidClass(container, emailField);

    // Phone field: focus + blur (empty) → fails ($inherited includes focusOut)
    fireEvent.focus(q(container, phoneInput));
    fireEvent.blur(q(container, phoneInput));
    await waitForInvalidClass(container, phoneField);
    expect(hasErrors(container, phoneField)).toBe(true);

    // Fill phone with valid length + keyUp → passes
    fireEvent.change(q(container, phoneInput), { target: { value: '111' } });
    fireEvent.keyUp(q(container, phoneInput), { keyCode: 1 });
    await waitForValidClass(container, phoneField);

    // Fill phone with too-short value + keyUp → fails
    fireEvent.change(q(container, phoneInput), { target: { value: '11' } });
    fireEvent.keyUp(q(container, phoneInput), { keyCode: 1 });
    await waitForInvalidClass(container, phoneField);

    // Blur then focus phone → does NOT lose invalid state ($inherited adds focusOut but not focusIn clear)
    fireEvent.blur(q(container, phoneInput));
    fireEvent.focus(q(container, phoneInput));
    await waitForInvalidClass(container, phoneField);
  });

  test('Validation events - showValidationWhenFocussed === false', async () => {
    // Rebuild schema with showValidationWhenFocussed: false on email field,
    // and $inherited added to its validatesOn (simulating what the Ember
    // updateFormSchema callback did).
    const schemaWithOverrides = {
      formSettings: { formName: 'validationEvents', hideSubmitButton: true },
      fields: [
        baseSchema.fields[0],
        {
          ...baseSchema.fields[1],
          showValidationWhenFocussed: false,
          validatesOn: ['$inherited', 'keyUp'],
        },
        {
          ...baseSchema.fields[2],
          // showValidationWhenFocussed not set → keeps failed state on focus
        },
      ],
    };

    const { container } = render(
      <ChangesetWebformComp formSchema={schemaWithOverrides} />,
    );

    // Email: type invalid + keyUp → should NOT validate because field is focussed
    // and showValidationWhenFocussed is false
    fireEvent.focus(q(container, emailInput));
    fireEvent.change(q(container, emailInput), { target: { value: '11' } });
    fireEvent.keyUp(q(container, emailInput), { keyCode: 1 });
    await waitForNoValidationClass(container, emailField);

    // Blur email → fails validation (blur is $inherited)
    fireEvent.blur(q(container, emailInput));
    await waitForInvalidClass(container, emailField);

    // Focus email again → showValidationWhenFocussed:false so clears invalid state
    fireEvent.focus(q(container, emailInput));
    await waitForNoValidationClass(container, emailField);

    // Phone: type invalid + keyUp → fails (showValidationWhenFocussed not set so
    // validation shows even when focussed)
    fireEvent.focus(q(container, phoneInput));
    fireEvent.change(q(container, phoneInput), { target: { value: '11' } });
    fireEvent.keyUp(q(container, phoneInput), { keyCode: 1 });
    await waitForInvalidClass(container, phoneField);

    // Blur phone → still fails
    fireEvent.blur(q(container, phoneInput));
    await waitForInvalidClass(container, phoneField);

    // Focus phone again → still shows invalid (showValidationWhenFocussed not set)
    fireEvent.focus(q(container, phoneInput));
    await waitForInvalidClass(container, phoneField);
  });
});
