import {
  visit,
  click,
  fillIn,
  triggerKeyEvent,
  focus,
  blur,
  find,
} from 'react-qunit-test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import {
  passedValidation,
  failedValidation,
  wasValidated,
} from 'react-changeset-webforms/src/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults';

module('Acceptance | Field methods', function (hooks) {
  setupApplicationTest(hooks);

  // test('validate method', async function (assert) {
  //   await visit('docs/field-methods');
  //   await click('[data-test-id="example-1"] [data-test-id="validate-externally"]');
  //   assert.ok(failedValidation('[data-test-id="field-methods1-form-name-field"]', validationTestHelpersDefaults), 'Name fields fails validation with UI triggered when external validate button is clicked and field is empty');
  //   await fillIn('[data-test-id="field-methods1-form-name-field"] input', 'Steve Holt');
  //   await triggerKeyEvent('[data-test-id="field-methods1-form-name-field"] input', 'keyup', 13);
  //   // BEGIN-SNIPPET passed-validation-helper-return-boolean.js
  //   assert.ok(passedValidation('[data-test-id="field-methods1-form-name-field"]', validationTestHelpersDefaults), 'Name fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly');
  //   // END-SNIPPET
  // });

  // test('validate method with skipUnvalidated', async function (assert) {
  //   await visit('docs/field-methods');
  //   assert.notOk(await wasValidated('[data-test-id="field-methods2-form-name-field"]', validationTestHelpersDefaults), 'Name is not validated on insert.');
  //   await focus('[data-test-id="field-methods2-form-name-field"] input');
  //   await blur('[data-test-id="field-methods2-form-name-field"] input');
  //   // BEGIN-SNIPPET failed-validation-helper-return-boolean.js
  //   assert.ok(failedValidation('[data-test-id="field-methods2-form-name-field"]', validationTestHelpersDefaults), 'Name field fails validation after focus out when name is invalid.');
  //   // END-SNIPPET
  //   await click('[data-test-id="example-2"] [data-test-id="validate-externally"]');
  //   assert.ok(await passedValidation('[data-test-id="field-methods2-form-name-field"]', validationTestHelpersDefaults), 'Name is has successful validation when external validate button is clicked');
  // });

  // test('setFieldOmission method', async function (assert) {
  //   await visit('docs/field-methods');
  //   assert.dom('[data-test-id="field-methods3-form-name-field"]').exists('Name field exists on load');
  //   await click('[data-test-id="example-3"] [data-test-id="toggle-name-field"]');
  //   assert.dom('[data-test-id="field-methods3-form-name-field"]').doesNotExist('Name field does not exist after clicking external toggle name button');
  //   await click('[data-test-id="example-3"] [data-test-id="toggle-name-field"]');
  //   assert.dom('[data-test-id="field-methods3-form-name-field"]').exists('Name field exists after clicking external toggle name button again');
  // });

  // test('updateValue method', async function (assert) {
  //   await visit('docs/field-methods');
  //   assert.dom('[data-test-id="field-methods4-form-name-field"] input').hasNoValue('Name field has no value on load');
  //   await click('[data-test-id="example-4"] [data-test-id="update-name-field"]');
  //   assert.dom('[data-test-id="field-methods4-form-name-field"] input').hasValue('New Name', 'Name field has has value "New name" after clicking "Update value of the name field" button.');
  //   assert.notOk(await wasValidated('[data-test-id="field-methods4-form-name-field"]', validationTestHelpersDefaults), 'Name is not validated when "Update value of the name field" button is clicked');
  // });

  test('pushErrors method - field unvalidated when called', async function (assert) {
    await visit('docs/field-methods');
    assert.notOk(
      await wasValidated(
        '[data-test-id="field-methods7-form-name-field"]',
        validationTestHelpersDefaults,
      ),
      'Field is not validated on insert.',
    );

    await checkPushErrors(assert, {}, this);
  });

  // test('pushErrors method - field passed validated when called', async function (assert) {
  //   await visit('docs/field-methods');
  //   await focus('[data-test-id="field-methods7-form-name-field"] input');
  //   await blur('[data-test-id="field-methods7-form-name-field"] input');

  //   (await passedValidation('[data-test-id="field-methods7-form-name-field"]', validationTestHelpersDefaults, assert, 'Field passed validation before pushError is called.'), await checkPushErrors(assert));
  // });

  // test('pushErrors method - field failed validated when called', async function (assert) {
  //   await visit('docs/field-methods');
  //   await fillIn('[data-test-id="field-methods7-form-name-field"] input', '');
  //   await blur('[data-test-id="field-methods7-form-name-field"] input');
  //   await failedValidation('[data-test-id="field-methods7-form-name-field"]', validationTestHelpersDefaults, assert, 'Field failed validation before pushError is called.');
  //   await checkPushErrors(assert, {
  //     existingErrors: [`Name can't be blank`],
  //   });
  // });
});

async function checkPushErrors(assert, opts = {}, env) {
  await fillIn(
    '[data-test-id="example-7"] [data-test-id="error-message-input"]',
    'One pushed error message',
  );
  await blur('[data-test-id="example-7"] [data-test-id="error-message-input"]');
  // if (env) {
  //   await env.pauseTest();
  // }
  await failedValidation(
    `[data-test-id="field-methods7-form-name-field"]`,
    validationTestHelpersDefaults,
    assert,
    'The pushErrors field method works when field has not yet been validated when it is called.',
  );
  await fillIn(
    '[data-test-id="example-7"] [data-test-id="error-message-input"]',
    'Another pushed error message',
  );
  await blur('[data-test-id="example-7"] [data-test-id="error-message-input"]');

  assert
    .dom(
      '[data-test-id="field-methods7-form-name-field"] [data-test-class="cwf-field-errors"]',
    )
    .hasText(
      `${opts.existingErrors ? opts.existingErrors.join(' ') + ' ' : ''}One pushed error messageAnother pushed error message`,
      'Calling pushErrors again adds to the existing errors.',
    );
}
