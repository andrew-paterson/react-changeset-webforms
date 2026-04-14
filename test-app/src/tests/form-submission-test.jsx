import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { renderWithProvider } from '../test-support/render-with-provider.jsx';
import { fillIn, blur, click, find, triggerKeyEvent, waitForElement } from 'react-changeset-webforms/src/test-support/test-helpers.jsx';
import testEls from './test-selectors.jsx';
import els from 'react-changeset-webforms/src/test-support/element-selectors.js';
import { passedValidation, failedValidation, wasValidated, noneValidated } from 'react-changeset-webforms/src/test-support/helpers.js';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults.js';
import DefaultFormSubmission from '../components/demos/DefaultFormSubmission.jsx';
import CustomFormSubmission from '../components/demos/CustomFormSubmission.jsx';
import SignupForm from '../components/demos/SignupForm.jsx';
import { _waitForMs } from 'react-changeset-webforms/src/test-support/test-helpers.jsx';
afterEach(() => cleanup());

async function checkAlert(alert, opts) {
  await waitForElement(alert, 5000);

  expect(find(alert).textContent.trim()).toBe(opts.message);
  expect(find(alert).className).toContain(`alert-${opts.type}`);
  if (find('[data-test-id="remove-alert"]')) {
    await click('[data-test-id="remove-alert"]');
  }
}

// ---------------------------------------------------------------------------
// Basics
// ---------------------------------------------------------------------------

describe('Form submission | Basics', () => {
  it('Basics', async () => {
    renderWithProvider(<SignupForm />);
    // expect(await wasValidated(testEls.signupFormNameField, validationTestHelpersDefaults), 'Name field is not validated on insert.').toBeFalsy();
    expect(find(`${testEls.signupFormNameField} input`).value).toBe('');
    await fillIn(`${testEls.signupFormNameField} input`, 'Steve Holt');
    await blur(`${testEls.signupFormNameField} input`);
    expect(find(`${testEls.signupFormNameField} input`).value).toBe('Steve Holt');
    // screen.debug();
    await _waitForMs(2000);
    expect(await passedValidation(testEls.signupFormNameField, validationTestHelpersDefaults)).toBeTruthy();
    // expect(find(`${testEls.signupFormRecoveryEmailField} input`).value).toBe('test');
    // expect(await failedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults)).toBeTruthy();
    // await fillIn(`${testEls.signupFormRecoveryEmailField} input`, 'test@email.com');
    // await blur(`${testEls.signupFormRecoveryEmailField} input`);
    // expect(await passedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults)).toBeTruthy();
    // expect(find(`${testEls.signupFormRecoveryEmailField} input`).value).toBe('test@email.com');
    // await click(testEls.cwfResetFormButton);
    // expect(find(`${testEls.signupFormRecoveryEmailField} input`).value).toBe('test');
    // expect(await failedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults)).toBeTruthy();
    // expect(await wasValidated(testEls.signupFormNameField, validationTestHelpersDefaults)).toBeFalsy();
    // expect(find(`${testEls.signupFormNameField} input`).value).toBe('');
    // await click(testEls.cwfClearFormButton);
    // expect(await noneValidated(`${testEls.signupForm} ${testEls.dataTestCwfField}`)).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Default form submission
// ---------------------------------------------------------------------------

// describe('Form submission | Default form submission results', () => {
//   it('Default form submission results', async () => {
//     const submitButton = `[data-test-id="default-form-submission"] ${testEls.cwfSubmitFormButton}`;
//     const alert = '[data-test-id="default-form-submission-alert"]';
//     const asyncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-success-response"] input';
//     const asyncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-error-response"] input';
//     const syncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-success-response"] input';
//     const syncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-error-response"] input';

//     renderWithProvider(<DefaultFormSubmission />);
//     await click(submitButton);
//     expect(await failedValidation('[data-test-id="default-form-submission-form-name-field"]', validationTestHelpersDefaults)).toBeTruthy();
//     expect(find(alert)).toBeNull();
//     await fillIn('[data-test-id="default-form-submission-form-name-field"] input', 'Steve Holt');
//     await blur('[data-test-id="default-form-submission-form-name-field"] input');
//     await click(asyncSuccessRadio);
//     await click(submitButton);
//     await checkAlert(alert, {
//       type: 'success',
//       message: 'Asynchronous success response',
//     });
//     await click(asyncErrorRadio);
//     await click(submitButton);
//     await checkAlert(alert, {
//       type: 'danger',
//       message: 'Asynchronous error response',
//     });
//     await click(syncSuccessRadio);
//     await click(submitButton);
//     await checkAlert(alert, {
//       type: 'success',
//       message: 'Synchronous success response',
//     });
//     await click(syncErrorRadio);
//     await click(submitButton);
//     await checkAlert(alert, {
//       type: 'danger',
//       message: 'Synchronous error response',
//     });
//   });
// });

// ---------------------------------------------------------------------------
// Custom form submission
// ---------------------------------------------------------------------------

// describe('Form submission | Custom form submission results', () => {
//   it('Custom form submission results', async () => {
//     const submitButton = `[data-test-id="custom-form-submission"] ${testEls.cwfSubmitFormButton}`;
//     const alert = '[data-test-id="custom-form-submission-alert"]';

//     renderWithProvider(<CustomFormSubmission />);
//     await click(submitButton);
//     expect(await failedValidation('[data-test-id="custom-form-submission-form-name-field"]', validationTestHelpersDefaults)).toBeTruthy();
//     await fillIn('[data-test-id="custom-form-submission-form-name-field"] input', 'Steve Holt');
//     await blur('[data-test-id="custom-form-submission-form-name-field"] input');
//     await click(submitButton);
//     await checkAlert(alert, {
//       type: 'success',
//       message: 'A completely custom form submission action was run.',
//     });
//   });

//   it('Pressing enter to submit', async () => {
//     const alert = '[data-test-id="custom-form-submission-alert"]';

//     renderWithProvider(<CustomFormSubmission />);
//     await fillIn('[data-test-id="custom-form-submission-form-name-field"] input', 'Steve Holt');
//     await triggerKeyEvent('[data-test-id="custom-form-submission-form-name-field"] input', 'keyup', 13);
//     await checkAlert(alert, {
//       type: 'success',
//       message: 'A completely custom form submission action was run.',
//     });
//   });
// });
