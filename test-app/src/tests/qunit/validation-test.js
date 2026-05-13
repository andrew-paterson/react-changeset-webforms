import {
  visit,
  find,
  click,
  findAll,
  focus,
  blur,
  fillIn,
  triggerKeyEvent,
} from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import els from 'react-changeset-webforms/src/test-support/element-selectors';
import {
  fieldErrorText,
  passedValidation,
  failedValidation,
  wasValidated,
} from 'react-changeset-webforms/src/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults';

module('Acceptance | Field validation', function (hooks) {
  setupApplicationTest(hooks);

  test('Validation events', async function (assert) {
    await visit('/docs/field-validation');
    await assert.notOk(
      await wasValidated(
        `${testEls.signupFormNameField}`,
        validationTestHelpersDefaults,
      ),
      'Field with validation event "insert" is not validated when empty on insert.',
    );
    // BEGIN-SNIPPET failed-validation-helper-with-assert.js
    await failedValidation(
      `${testEls.signupFormRecoveryEmailField}`,
      validationTestHelpersDefaults,
      assert,
      'Invalid field with validation event "insert" fails validation insert.',
    );
    // END-SNIPPET
    await focus(`${testEls.signupFormNameField} input`);
    assert.notOk(
      await wasValidated(
        `${testEls.signupFormNameField}`,
        validationTestHelpersDefaults,
      ),
      'Field without validation event "keyUp" loses validation when focussed.',
    );
    await blur(`${testEls.signupFormNameField} input`);
    assert.strictEqual(
      fieldErrorText(`${testEls.signupFormNameField}`).join(''),
      `Name can't be blank`,
      'Correct default error message shows for empty name field after focus out.',
    );
    await focus(`${testEls.signupFormNameField} input`);
    await failedValidation(
      `${testEls.signupFormNameField}`,
      validationTestHelpersDefaults,
      assert,
      'Field with "keyUp" validation event does not lose  class "invalid" when focussed.',
    );
    await fillIn(`${testEls.signupFormNameField} input`, 'T');
    await triggerKeyEvent(
      find(`${testEls.signupFormNameField} input`),
      'keyup',
      1,
    );
    // BEGIN-SNIPPET passed-validation-helper-with-assert.js
    await passedValidation(
      `${testEls.signupFormNameField}`,
      validationTestHelpersDefaults,
      assert,
      'Field with "keyUp" validation event passes validation on keyUp when user types single char.',
    );
    // END-SNIPPET
    await fillIn(`${testEls.signupFormNameField} input`, '');
    await triggerKeyEvent(
      find(`${testEls.signupFormNameField} input`),
      'keyup',
      1,
    );
    await failedValidation(
      `${testEls.signupFormNameField}`,
      validationTestHelpersDefaults,
      assert,
      'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.',
    );
    await passedValidation(
      `${testEls.signupFormEmailField}`,
      validationTestHelpersDefaults,
      assert,

      'Valid field with validation event "insert" passes validation on insert.',
    );
    await fillIn(`${testEls.signupFormEmailField} input`, 'bluemangroup');
    await blur(`${testEls.signupFormEmailField} input`);
    await focus(`${testEls.signupFormPasswordField} input`);
    await blur(`${testEls.signupFormPasswordField} input`);
    assert.ok(
      await wasValidated(
        `${testEls.signupFormPasswordField}`,
        validationTestHelpersDefaults,
      ),
      'Validation runs on focus out of input field by default.',
    );
    await click(
      `${testEls.signupFormAcceptTermsFieldRadioOptionTrue} input[type="radio"]`,
    );

    await passedValidation(
      `${testEls.signupFormAcceptTermsField}`,
      validationTestHelpersDefaults,
      assert,

      'Validation runs after selecting option in radio button group.',
    );
    await click(
      `${testEls.signupFormConfirmHumanField} input[type="checkbox"]`,
    );
    await passedValidation(
      `${testEls.signupFormConfirmHumanField}`,
      validationTestHelpersDefaults,
      assert,
      'Validation runs after checking single checkbox.',
    );
    // TODO checkbox group and text area.
  });

  test('Validation messages', async function (assert) {
    await visit('/docs/field-validation');
    await click(`[data-test-id="signup"] ${testEls.cwfClearFormButton}`);
    await click(`[data-test-id="signup"] ${els.cwfSubmitButton}`);

    assert.strictEqual(
      findAll(`[data-test-id="signup"] ${els.cwfFieldErrors}`).length,
      7,
      'All fields with validation rules are validated when user clicks submit button.',
    );
    assert.strictEqual(
      fieldErrorText(testEls.signupFormRecoveryEmailField).join(''),
      `Back up email address can't be blankRecovery email must be a valid email address`,
      'Passing "description" as an argument to validationRules replaces the default validation description ("Recovery email) with the description provided.',
    );
    assert.strictEqual(
      fieldErrorText(testEls.signupFormAcceptTermsField).join(''),
      'You must accept the terms to continue.',
      'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.',
    );
    await fillIn(`${testEls.signupFormEmailField} input`, '');
    await blur(`${testEls.signupFormEmailField} input`);
    assert.strictEqual(
      findAll(`${testEls.signupFormEmailField} ${els.cwfFieldError}`).length,
      2,
      'Multiple errors display where multiple exist.',
    );
  });

  test('Custom validators', async function (assert) {
    await visit('/docs/integrating-custom-validators');
    await click(els.cwfSubmitButton);
    const fields = findAll(
      `${testEls.integratingCustomValidatorsForm} ${els.cwfField}`,
    );
    assert.strictEqual(
      fieldErrorText(fields[0]).concat(fieldErrorText(fields[1])).join('|'),
      'The primary number field must be unique, but it is the same as recovery number.|The recovery number field must be unique, but it is the same as primary number.',
      'Custom validator is applied correctly.',
    );
  });

  // TODO - validation of all fields on submit, and ignores omitted fields.
});
