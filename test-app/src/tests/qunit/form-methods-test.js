import { visit, click, fillIn, triggerKeyEvent, blur } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import { passedValidation, failedValidation, wasValidated } from 'react-changeset-webforms/src/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults';

module('Acceptance | Form methods', function (hooks) {
  setupApplicationTest(hooks);

  test('validate method', async function (assert) {
    await visit('docs/form-methods');
    await click('[data-test-id="example-1"] [data-test-id="validate-externally"]');
    assert.ok(failedValidation('[data-test-id="form-methods1-form-name-field"]', validationTestHelpersDefaults), 'Name fields fails validation with UI triggered when external validate button is clicked and field is empty');
    assert.ok(failedValidation('[data-test-id="form-methods1-form-email-field"]', validationTestHelpersDefaults), 'Email fields fails /*  */validation with UI triggered when external validate button is clicked and field is empty');
    await fillIn('[data-test-id="form-methods1-form-name-field"] input', 'Steve Holt');
    await triggerKeyEvent('[data-test-id="form-methods1-form-name-field"] input', 'keyup', 13);
    await fillIn('[data-test-id="form-methods1-form-email-field"] input', 'steveholt@bluthcompany.com');
    await triggerKeyEvent('[data-test-id="form-methods1-form-email-field"] input', 'keyup', 13);
    assert.ok(passedValidation('[data-test-id="form-methods1-form-name-field"]', validationTestHelpersDefaults), 'Name fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly');
    assert.ok(passedValidation('[data-test-id="form-methods1-form-email-field"]', validationTestHelpersDefaults), 'Email fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly');
  });

  test('validate method with skipUnvalidated', async function (assert) {
    await visit('docs/form-methods');
    assert.notOk(await wasValidated('[data-test-id="form-methods2-form-name-field"]', validationTestHelpersDefaults), 'Name is not validated on insert.');
    assert.ok(failedValidation('[data-test-id="form-methods2-form-email-field"]', validationTestHelpersDefaults), 'Email fields fails validation with UI triggered when inserted with invalid value');
    await click('[data-test-id="example-2"] [data-test-id="validate-externally"]');
    assert.notOk(await wasValidated('[data-test-id="form-methods2-form-name-field"]', validationTestHelpersDefaults), 'Name is not validated when external validate button is clicked');
    assert.ok(passedValidation('[data-test-id="form-methods2-form-email-field"]', validationTestHelpersDefaults), 'Email fields is revalidated with with UI triggered when external validate button is clicked');
  });

  test('setFieldOmission method', async function (assert) {
    await visit('docs/form-methods');
    assert.dom('[data-test-id="form-methods3-form-email-field"]').exists('Email field exists on load');
    await click('[data-test-id="example-3"] [data-test-id="toggle-email-field"]');
    assert.dom('[data-test-id="form-methods3-form-email-field"]').doesNotExist('Email field does not exist after clicking external toggle email button');
    await click('[data-test-id="example-3"] [data-test-id="toggle-email-field"]');
    assert.dom('[data-test-id="form-methods3-form-email-field"]').exists('Email field exists after clicking external toggle email button again');
  });

  test('clear method', async function (assert) {
    await visit('docs/form-methods');
    assert.dom('[data-test-id="form-methods7-form-name-field"] input').hasValue('Steve Holt', 'Name field has default value on load');
    assert.dom('[data-test-id="form-methods7-form-email-field"] input').hasValue('steveholt@bluthcompany.com', 'Email field has default value on load');
    await fillIn('[data-test-id="form-methods7-form-email-field"] input', 'steveholt!');
    await triggerKeyEvent('[data-test-id="form-methods7-form-email-field"] input', 'keyup', 13);
    assert.dom('[data-test-id="form-methods7-form-email-field"] input').hasValue('steveholt!', 'Email field is updated');

    assert.ok(failedValidation('[data-test-id="form-methods7-form-email-field"]', validationTestHelpersDefaults), 'Email field is validated before clicking clear form button');
    await click('[data-test-id="example-7"] [data-test-id="cwf-clear-form-button"]');
    assert.dom('[data-test-id="example-7"] [data-test-id="actions-log"]').includesText('The beforeClearForm action was called', 'beforeClearForm action was called');
    assert.dom('[data-test-id="example-7"] [data-test-id="actions-log"]').includesText('The afterClearForm action was called', 'afterClearForm action was called');
    assert.dom('[data-test-id="form-methods7-form-name-field"] input').hasValue('', 'Name field is cleared after the clear button is clicked.');
    assert.dom('[data-test-id="form-methods7-form-email-field"] input').hasValue('', 'Email field is cleared after the clear button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods7-form-name-field"]', validationTestHelpersDefaults), 'Name field is unvalidated  after the clear button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods7-form-email-field"]', validationTestHelpersDefaults), 'Email field is unvalidated  after the clear button is clicked.');
  });

  test('reset method - @data prop passed to changesetWebform component', async function (assert) {
    await visit('docs/form-methods');
    assert.dom('[data-test-id="form-methods8-form-name-field"] input').hasValue('Steve Holt', 'Name field has default value on load');
    assert.dom('[data-test-id="form-methods8-form-email-field"] input').hasValue('steveholt@bluthcompany.com', 'Email field has default value on load');
    await fillIn('[data-test-id="form-methods8-form-name-field"] input', 'Steve Holt Jr.');
    await triggerKeyEvent('[data-test-id="form-methods8-form-name-field"] input', 'keyup', 1);
    assert.dom('[data-test-id="form-methods8-form-name-field"] input').hasValue('Steve Holt Jr.', 'Name field is updated');
    await fillIn('[data-test-id="form-methods8-form-email-field"] input', 'steveholt!');
    await triggerKeyEvent('[data-test-id="form-methods8-form-email-field"] input', 'keyup', 1);
    assert.dom('[data-test-id="form-methods8-form-email-field"] input').hasValue('steveholt!', 'Email field is updated');

    assert.ok(failedValidation('[data-test-id="form-methods8-form-email-field"]', validationTestHelpersDefaults), 'Email field is validated before clicking clear form button');
    await click('[data-test-id="example-8"] [data-test-id="cwf-discard-changes-button"]');
    assert.dom('[data-test-id="example-8"] [data-test-id="actions-log"]').includesText('The beforeResetForm action was called', 'beforeResetForm action was called');
    assert.dom('[data-test-id="example-8"] [data-test-id="actions-log"]').includesText('The afterResetForm action was called', 'afterResetForm action was called');
    assert.dom('[data-test-id="form-methods8-form-name-field"] input').hasValue('Steve Holt', 'Name field is reset to default value after the reset form button is clicked.');
    assert.dom('[data-test-id="form-methods8-form-email-field"] input').hasValue('steveholt@bluthcompany.com', 'Email field is reset to default value after the reset form button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods8-form-name-field"]', validationTestHelpersDefaults), 'Name field is unvalidated  after the reset form button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods8-form-email-field"]', validationTestHelpersDefaults), 'Email field is unvalidated  after the reset form button is clicked.');
  });

  test('reset method - no @data prop but defaultvalue passed for each field', async function (assert) {
    await visit('docs/form-methods');
    assert.dom('[data-test-id="form-methods9-form-name-field"] input').hasValue('Steve Holt', 'Name field has default value on load');
    assert.dom('[data-test-id="form-methods9-form-email-field"] input').hasValue('steveholt@bluthcompany.com', 'Email field has default value on load');
    await fillIn('[data-test-id="form-methods9-form-name-field"] input', 'Steve Holt Jr.');
    await triggerKeyEvent('[data-test-id="form-methods9-form-name-field"] input', 'keyup', 1);
    assert.dom('[data-test-id="form-methods9-form-name-field"] input').hasValue('Steve Holt Jr.', 'Name field is updated');
    await fillIn('[data-test-id="form-methods9-form-email-field"] input', 'steveholt!');
    await triggerKeyEvent('[data-test-id="form-methods9-form-email-field"] input', 'keyup', 1);
    assert.dom('[data-test-id="form-methods9-form-email-field"] input').hasValue('steveholt!', 'Email field is updated');

    assert.ok(failedValidation('[data-test-id="form-methods9-form-email-field"]', validationTestHelpersDefaults), 'Email field is validated before clicking clear form button');
    await click('[data-test-id="example-9"] [data-test-id="cwf-discard-changes-button"]');
    assert.dom('[data-test-id="form-methods9-form-name-field"] input').hasValue('', 'Name field is cleared after the reset form button is clicked.');
    assert.dom('[data-test-id="form-methods9-form-email-field"] input').hasValue('', 'Email field is cleared after the reset form button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods9-form-name-field"]', validationTestHelpersDefaults), 'Name field is unvalidated  after the reset form button is clicked.');
    assert.notOk(await wasValidated('[data-test-id="form-methods9-form-email-field"]', validationTestHelpersDefaults), 'Email field is unvalidated  after the reset form button is clicked.');
  });

  test('pushErrors method', async function (assert) {
    await visit('docs/form-methods');

    assert.ok(passedValidation('[data-test-id="form-methods6-form-email-field"]', validationTestHelpersDefaults), 'Email field passes validation when inserted');
    await fillIn('[data-test-id="form-methods9-form-email-field"] input', 'taken@example.com');
    await triggerKeyEvent('[data-test-id="form-methods9-form-email-field"] input', 'keyup', 1);
    assert.ok(passedValidation('[data-test-id="form-methods6-form-email-field"]', validationTestHelpersDefaults), 'Email field passes validation before pushErrors is called');
    await click('[data-test-id="example-6"] [data-test-id="cwf-submit-form-button"]');
    await failedValidation('[data-test-id="form-methods6-form-email-field"]', validationTestHelpersDefaults, assert, 'Email field fails validation after form is submitted and pushErrors is called');
  });

  test('hasValidationErrors method', async function (assert) {
    await visit('docs/form-methods');
    checkNextStepEnabled(assert, 10, {
      assertionSuffix: 'when no fields have been validated.',
    });
    await fillIn('[data-test-id="form-methods10-form-email-field"] input', 'Steve Holt');
    await blur('[data-test-id="form-methods10-form-email-field"] input');

    checkNextStepDisabled(assert, 10, {
      assertionSuffix: 'when one field has failed validation.',
    });
  });

  test('hasUnvalidatedFields method', async function (assert) {
    await visit('docs/form-methods');

    checkNextStepDisabled(assert, 4, {
      assertionSuffix: 'when no fields have been validated.',
    });
    await fillIn('[data-test-id="form-methods4-form-name-field"] input', 'Steve Holt');
    await blur('[data-test-id="form-methods4-form-name-field"] input');
    checkNextStepDisabled(assert, 4, {
      assertionSuffix: 'when one field has passed validation, but the other has not been validated.',
    });
    await fillIn('[data-test-id="form-methods4-form-email-field"] input', 'notavalidemail');
    await blur('[data-test-id="form-methods4-form-email-field"] input');
    checkNextStepDisabled(assert, 4, {
      assertionSuffix: 'when one field has passed validation, but the other failed validation.',
    });
    await fillIn('[data-test-id="form-methods4-form-email-field"] input', 'steveholt@bluthcompany.com');
    await blur('[data-test-id="form-methods4-form-email-field"] input');
    checkNextStepEnabled(assert, 4, {
      assertionSuffix: 'when both fields have passed validation.',
    });
  });
});

function checkNextStepDisabled(assert, exampleNumber, opts = {}) {
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="next-step-disabled"]`).exists(`Next step disabled button exists ${opts.assertionSuffix}.`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="alert-danger"]`).exists(`Danger alert has exists ${opts.assertionSuffix}'`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="next-step-enabled"]`).doesNotExist(`Go to next step does not exist ${opts.assertionSuffix}.`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="alert-success"]`).doesNotExist(`Success alert does not exist ${opts.assertionSuffix}.`);
}

function checkNextStepEnabled(assert, exampleNumber, opts = {}) {
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="next-step-enabled"]`).exists(`Go to next step button exists ${opts.assertionSuffix}.`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="alert-success"]`).exists(`Success alert has exists ${opts.assertionSuffix}'`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="next-step-disabled"]`).doesNotExist(`Next step disabled button does not exist ${opts.assertionSuffix}.`);
  assert.dom(`[data-test-id="form-methods-example-${exampleNumber}"] [data-test-id="alert-danger"]`).doesNotExist(`Danger alert does not exist ${opts.assertionSuffix}.`);
}
