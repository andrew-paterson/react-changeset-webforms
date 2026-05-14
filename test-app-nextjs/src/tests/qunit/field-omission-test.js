import {
  visit,
  click,
  fillIn,
  triggerKeyEvent,
} from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import {
  passedValidation,
  wasValidated,
} from 'react-changeset-webforms/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/test-support/validation-test-helpers-defaults';

// TODO test and document if the data prop of an omitted field is sent with the data payload to submitData

module('Acceptance | Field omission', function (hooks) {
  setupApplicationTest(hooks);

  test('Explicit - changesetWebform.setFieldOmission method - yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert);
    await selectMealRequiredYes(assert);
    await selectMealOptionBeef(assert);
    await selectMealRequiredNo(assert);
    await selectMealRequiredYes(assert);
  });

  test('Explicit - changesetWebform.setFieldOmission method - no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert);
    await selectMealRequiredNo(assert);
    await selectMealRequiredYes(assert);
    await selectMealOptionBeef(assert);
    await selectMealRequiredNo(assert);
  });

  test('Explicit - formField.setOmission method - yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '5' });
    await selectMealRequiredYes(assert, { demoNumber: '5' }, this);
    await selectMealOptionBeef(assert, { demoNumber: '5' });
    await selectMealRequiredNo(assert, { demoNumber: '5' });
    await selectMealRequiredYes(assert, { demoNumber: '5' });
  });

  test('Explicit - formField.setOmission method - no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '5' });
    await selectMealRequiredNo(assert, { demoNumber: '5' });
    await selectMealRequiredYes(assert, { demoNumber: '5' });
    await selectMealOptionBeef(assert, { demoNumber: '5' });
    await selectMealRequiredNo(assert, { demoNumber: '5' });
  });

  test('Dynamic - yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
    await selectMealOptionBeef(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
  });

  test('Dynamic - no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
    await selectMealOptionBeef(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
  });

  test('Dynamic with extended API- yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
    await selectMealOptionBeef(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
  });

  test('Dynamic with extended API- no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
    await selectMealOptionBeef(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
  });

  test('Dynamic with nested rules', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist('Free drink field does not exist on load.');
    await click(
      `${testEls[`omittingFields4FormIsMemberFieldRadioOptionYes`]} input`,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .exists(
        'Free drink field exists after user selects "Yes" for "Are you a member" field.',
      );
    await click(
      `${testEls[`omittingFields4FormIsMemberFieldRadioOptionNo`]} input`,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field removed when user selects "No" for "Are you a member" field.',
      );

    await fillIn(`${testEls.omittingFields4FormMainsField} input`, '3');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormMainsField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field does not exist when user sets "mains" field to 3, when sides field is empty',
      );
    await fillIn(`${testEls.omittingFields4FormSidesField} input`, '3');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormSidesField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .exists('Free drink field does exist when user sets "sides" field to 3.');
    await fillIn(`${testEls.omittingFields4FormMainsField} input`, '2');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormMainsField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field does not exist when user sets "mains" field to 2.',
      );
  });
});

function checkStateMealRequiredNotSet(assert, opts = {}) {
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .doesNotExist('Next button does not exist on load.');
  assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .doesNotExist('Omitted meal option field does not exist on load.');
}

async function selectMealRequiredYes(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredFieldRadioOptionYes`]} input`,
  );
  await passedValidation(
    testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredField`],
    Object.assign({}, validationTestHelpersDefaults, {
      passedValidationAssertionPrefix: 'Meal required field passed validation',
    }),
    assert,
    'after selecting "Yes"',
  );
  await assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .exists(
      'Meal option field exists after "Yes" is clicked in meal required field.',
    );
  await assert.notOk(
    await wasValidated(
      testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`],
      validationTestHelpersDefaults,
    ),
    'Meal option field is not validated on insert.',
  );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .doesNotExist(
      'Next button does not exist after selecting "Yes" for meal required, but before selecting a meal option.',
    );
}

async function selectMealRequiredNo(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredFieldRadioOptionNo`]} input`,
  );
  await passedValidation(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredField`]}`,
    Object.assign({}, validationTestHelpersDefaults, {
      passedValidationAssertionPrefix: 'Meal required field passed validation',
    }),
    assert,
    'after selecting "No"',
  );
  await assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .doesNotExist(
      'Meal option field does not exist after "No" is clicked in meal required field.',
    );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .exists('Next button exists after selecting "No" for meal required.');
}

async function selectMealOptionBeef(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionFieldRadioOptionBeef`]} input`,
  );
  await passedValidation(
    testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`],
    Object.assign({}, validationTestHelpersDefaults, {
      passedValidationAssertionPrefix: 'Meal option field passed validation',
    }),
    assert,
    'after selecting a meal option',
  );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .exists('Next button exists after selecting a meal option.');
}
