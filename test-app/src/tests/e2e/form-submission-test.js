import { test, expect } from '@playwright/test';
import testEls from './test-selectors.jsx';
import els from 'react-changeset-webforms/src/test-support/element-selectors.js';
import { passedValidation, failedValidation, wasValidated, noneValidated } from 'react-changeset-webforms/src/test-support/helpers.js';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults.js';
// ---------------------------------------------------------------------------
// Selectors (mirrors test-selectors.jsx for the relevant keys)
// ---------------------------------------------------------------------------

const signupForm = '[data-test-id="signup"]';
const signupFormNameField = '[data-test-id="signup-form-name-field"]';
const signupFormRecoveryEmailField = '[data-test-id="signup-form-recovery-email-field"]';
const cwfResetFormButton = '[data-test-id="cwf-discard-changes-button"]';
const cwfClearFormButton = '[data-test-id="cwf-clear-form-button"]';
const cwfSubmitFormButton = '[data-test-id="cwf-submit-form-button"]';
const dataTestCwfField = '[data-test-cwf-field]';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// /** Checks that a field has passed validation. */
// async function passedValidation(selector) {
//   const el = page.locator(selector);
//   await expect(el).toHaveAttribute('data-test-was-validated', /.*/);
//   await expect(el).toHaveAttribute('data-test-validation-status', 'valid');
// }

// /** Checks that a field has failed validation. */
// async function failedValidation(selector) {
//   const el = page.locator(selector);
//   await expect(el).toHaveAttribute('data-test-was-validated', /.*/);
//   await expect(el).toHaveAttribute('data-test-validation-status', 'invalid');
// }

async function checkAlert(page, alertSelector, opts) {
  const alert = page.locator(alertSelector);
  await alert.waitFor({ state: 'visible', timeout: 5000 });
  await expect(alert).toHaveText(opts.message);
  await expect(alert).toHaveClass(new RegExp(`alert-${opts.type}`));
  const removeBtn = page.locator('[data-test-id="remove-alert"]');
  if (await removeBtn.isVisible()) {
    await removeBtn.click();
  }
}

// ---------------------------------------------------------------------------
// Basics
// ---------------------------------------------------------------------------

test.describe('Form submission | Basics', () => {
  test('Basics', async ({ page }) => {
    await page.goto('/docs/form-settings');

    const nameField = page.locator(signupFormNameField);
    const recoveryEmailField = page.locator(signupFormRecoveryEmailField);

    // Name field is not validated on insert
    await expect(nameField).not.toHaveAttribute('data-test-was-validated');
    await expect(nameField.locator('input')).toHaveValue('');

    await nameField.locator('input').fill('Steve Holt');
    await nameField.locator('input').blur();
    await expect(nameField.locator('input')).toHaveValue('Steve Holt');
    await passedValidation(page.locator(signupFormNameField));

    // Recovery email field has initial value and fails validation on insert
    await expect(recoveryEmailField.locator('input')).toHaveValue('test');
    await failedValidation(page.locator(signupFormRecoveryEmailField));

    await recoveryEmailField.locator('input').fill('test@email.com');
    await recoveryEmailField.locator('input').blur();
    await passedValidation(page.locator(signupFormRecoveryEmailField));
    await expect(recoveryEmailField.locator('input')).toHaveValue('test@email.com');

    // Reset form restores initial values
    await page.locator(cwfResetFormButton).click();
    await expect(recoveryEmailField.locator('input')).toHaveValue('test');
    await failedValidation(page.locator(signupFormRecoveryEmailField));
    await expect(nameField).not.toHaveAttribute('data-test-was-validated');
    await expect(nameField.locator('input')).toHaveValue('');

    // Clear form clears all validation state
    await page.locator(cwfClearFormButton).click();
    const allFields = page.locator(`${signupForm} ${dataTestCwfField}`);
    const count = await allFields.count();
    for (let i = 0; i < count; i++) {
      await expect(allFields.nth(i)).not.toHaveAttribute('data-test-was-validated');
    }
  });
});

// ---------------------------------------------------------------------------
// Default form submission results
// ---------------------------------------------------------------------------

test.describe('Form submission | Default form submission results', () => {
  test('Default form submission results', async ({ page }) => {
    const submitButton = `[data-test-id="default-form-submission"] ${cwfSubmitFormButton}`;
    const alert = '[data-test-id="default-form-submission-alert"]';
    const asyncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-success-response"] input';
    const asyncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-error-response"] input';
    const syncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-success-response"] input';
    const syncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-error-response"] input';

    await page.goto('/docs/form-submission');

    await page.locator(submitButton).click();
    await failedValidation(page.locator('[data-test-id="default-form-submission-form-name-field"]'));
    await expect(page.locator(alert)).not.toBeVisible();

    await page.locator('[data-test-id="default-form-submission-form-name-field"] input').fill('Steve Holt');
    await page.locator('[data-test-id="default-form-submission-form-name-field"] input').blur();

    await page.locator(asyncSuccessRadio).click();
    await page.locator(submitButton).click();
    await checkAlert(page, alert, { type: 'success', message: 'Asynchronous success response' });

    await page.locator(asyncErrorRadio).click();
    await page.locator(submitButton).click();
    await checkAlert(page, alert, { type: 'danger', message: 'Asynchronous error response' });

    await page.locator(syncSuccessRadio).click();
    await page.locator(submitButton).click();
    await checkAlert(page, alert, { type: 'success', message: 'Synchronous success response' });

    await page.locator(syncErrorRadio).click();
    await page.locator(submitButton).click();
    await checkAlert(page, alert, { type: 'danger', message: 'Synchronous error response' });
  });
});

// ---------------------------------------------------------------------------
// Custom form submission results
// ---------------------------------------------------------------------------

test.describe('Form submission | Custom form submission results', () => {
  test('Custom form submission results', async ({ page }) => {
    const submitButton = `[data-test-id="custom-form-submission"] ${cwfSubmitFormButton}`;
    const alert = '[data-test-id="custom-form-submission-alert"]';

    await page.goto('/docs/form-submission');

    await page.locator(submitButton).click();
    await failedValidation(page.locator('[data-test-id="custom-form-submission-form-name-field"]'));

    await page.locator('[data-test-id="custom-form-submission-form-name-field"] input').fill('Steve Holt');
    await page.locator('[data-test-id="custom-form-submission-form-name-field"] input').blur();
    await page.locator(submitButton).click();
    await checkAlert(page, alert, {
      type: 'success',
      message: 'A completely custom form submission action was run.',
    });
  });

  test('Pressing enter to submit', async ({ page }) => {
    const alert = '[data-test-id="custom-form-submission-alert"]';

    await page.goto('/docs/form-submission');

    await page.locator('[data-test-id="custom-form-submission-form-name-field"] input').fill('Steve Holt');
    await page.locator('[data-test-id="custom-form-submission-form-name-field"] input').press('Enter');
    await checkAlert(page, alert, {
      type: 'success',
      message: 'A completely custom form submission action was run.',
    });
  });
});
