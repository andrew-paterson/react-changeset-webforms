import { visit, fillIn, blur, click, waitFor, find, triggerKeyEvent, pauseTest } from 'react-changeset-webforms/src/test-support/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import { passedValidation, failedValidation, wasValidated, noneValidated } from 'react-changeset-webforms/src/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults';

module('Acceptance | Form submission', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/form-settings');
    // await this.pauseTest();
    assert.notOk(await wasValidated(testEls.signupFormNameField, validationTestHelpersDefaults), 'Name field is not validated on insert.');
    assert.dom(`${testEls.signupFormNameField} input`).hasValue('', 'Name field is empty on insert.');
    await fillIn(`${testEls.signupFormNameField} input`, 'Steve Holt');
    await blur(`${testEls.signupFormNameField} input`);
    assert.dom(`${testEls.signupFormNameField} input`).hasValue('Steve Holt', 'Name field has value after filling in focussing out.');
    await passedValidation(testEls.signupFormNameField, validationTestHelpersDefaults, assert, 'Name field passes validation after  filling in focussing out.');
    assert.dom(`${testEls.signupFormRecoveryEmailField} input`).hasValue('test', 'Email recovery field has initial value "test".');
    await failedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults, assert, 'Email recovery field has failed validation on insert.');
    await fillIn(`${testEls.signupFormRecoveryEmailField} input`, 'test@email.com');
    await blur(`${testEls.signupFormRecoveryEmailField} input`);

    await passedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults, assert, 'Email recovery field passes validation after completing the email and focussing out.');
    assert.dom(`${testEls.signupFormRecoveryEmailField} input`).hasValue('test@email.com', 'Email recovery field has value "test@email.com after being completed".');
    await click(testEls.cwfResetFormButton);
    assert.dom(`${testEls.signupFormRecoveryEmailField} input`).hasValue('test', 'Email recovery field has value "test" after clicking "Discard changes".');
    await failedValidation(testEls.signupFormRecoveryEmailField, validationTestHelpersDefaults, assert, 'Email recovery field fails validation after clicking "Discard changes".');
    assert.notOk(await wasValidated(testEls.signupFormNameField, validationTestHelpersDefaults), 'Name field is not validated after clicking "Discard changes".');
    assert.dom(`${testEls.signupFormNameField} input`).hasValue('', 'Name field is empty after clicking "Discard changes".');
    await click(testEls.cwfClearFormButton);
    assert.ok(await noneValidated(`${testEls.signupForm} ${testEls.dataTestCwfField}`), 'All fields are not validated after clicking "Clear form".');

    // await click(testEls.cwfSubmitFormButton);
  });
  test('Default form submission results', async function (assert) {
    const submitButton = `[data-test-id="default-form-submission"] ${testEls.cwfSubmitFormButton}`;
    const alert = '[data-test-id="default-form-submission-alert"]';
    const asyncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-success-response"] input';
    const asyncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-asynchronous-error-response"] input';
    const syncSuccessRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-success-response"] input';
    const syncErrorRadio = '[data-test-id="default-form-submission-form-server-response-type-field-radio-option-synchronous-error-response"] input';
    await visit('/docs/form-submission');
    await click(submitButton);
    await failedValidation('[data-test-id="default-form-submission-form-name-field"]', validationTestHelpersDefaults, assert, 'Name field fails validation when submit clicked while the field is empty.');
    assert.dom(alert).doesNotExist('Alert does not exist when submit clicked while the field is empty.');
    await fillIn('[data-test-id="default-form-submission-form-name-field"] input', 'Steve Holt');
    await blur('[data-test-id="default-form-submission-form-name-field"] input');
    await click(asyncSuccessRadio);
    await click(submitButton);

    await checkAlert(assert, alert, {
      type: 'success',
      message: 'Asynchronous success response',
      assertionSuffix: 'after successful asynchronous submission.',
    });
    await click(asyncErrorRadio);
    await click(submitButton);
    await checkAlert(assert, alert, {
      type: 'danger',
      message: 'Asynchronous error response',
      assertionSuffix: 'after failed asynchronous submission.',
    });

    await click(syncSuccessRadio);
    await click(submitButton);
    await checkAlert(assert, alert, {
      type: 'success',
      message: 'Synchronous success response',
      assertionSuffix: 'after successful synchronous submission.',
    });
    await click(syncErrorRadio);
    await click(submitButton);
    await checkAlert(assert, alert, {
      type: 'danger',
      message: 'Synchronous error response',
      assertionSuffix: 'after failed synchronous submission.',
    });
  });

  test('Custom form submission results', async function (assert) {
    const submitButton = `[data-test-id="custom-form-submission"] ${testEls.cwfSubmitFormButton}`;
    const alert = '[data-test-id="custom-form-submission-alert"]';

    await visit('/docs/form-submission');
    await click(submitButton);
    await failedValidation('[data-test-id="custom-form-submission-form-name-field"]', validationTestHelpersDefaults, assert, 'Name field fails validation when submit clicked while the field is empty.');
    await fillIn('[data-test-id="custom-form-submission-form-name-field"] input', 'Steve Holt');
    await blur('[data-test-id="custom-form-submission-form-name-field"] input');
    await click(submitButton);

    await checkAlert(assert, alert, {
      type: 'success',
      message: 'A completely custom form submission action was run.',
      assertionSuffix: 'after successful submission.',
    });
  });

  test('Pressing enter to submit', async function (assert) {
    const alert = '[data-test-id="custom-form-submission-alert"]';

    await visit('/docs/form-submission');
    await fillIn('[data-test-id="custom-form-submission-form-name-field"] input', 'Steve Holt');
    await triggerKeyEvent('[data-test-id="custom-form-submission-form-name-field"] input', 'keyup', 13);

    await checkAlert(assert, alert, {
      type: 'success',
      message: 'A completely custom form submission action was run.',
      assertionSuffix: 'after successful submission.',
    });
  });
});

// Icons show
// Spinner works for submit

async function checkAlert(assert, alertEl, opts) {
  await waitFor(alertEl, { timeout: 5000 });

  assert.dom(alertEl).hasText(opts.message, `Alert has correct text content ${opts.assertionSuffix}`);
  assert.dom(alertEl).hasClass(`alert-${opts.type}`, `Alert has correct class ${opts.assertionSuffix}`);
  if (find('[data-test-id="remove-alert"]')) {
    await click('[data-test-id="remove-alert"]');
  }
}
