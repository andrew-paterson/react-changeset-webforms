import { visit, fillIn, focus, blur, click } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import els from 'react-changeset-webforms/test-support/element-selectors';
import { selectChoose } from 'ember-power-select/test-support';
import {
  fieldErrorText,
  passedValidation,
  failedValidation,
  wasValidated,
} from 'react-changeset-webforms/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/test-support/validation-test-helpers-defaults';

module('Acceptance | Custom fields', function (hooks) {
  setupApplicationTest(hooks);

  test('Phone number edited first', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await focus(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await failedValidation(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      validationTestHelpersDefaults,
      assert,
      'Field fails validation on focusOutPhoneNumberInput.',
    );
    assert.strictEqual(
      fieldErrorText(`${testEls.cwfFieldTypePhoneNumberWithCountryCode}`).join(
        '|',
      ),
      `Phone number can't be blank|Country code and number are required`,
      'Correct error message shows for empty code and number on focus out.',
    );
    await fillIn(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 456 7890',
    );
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);

    await failedValidation(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      validationTestHelpersDefaults,
      assert,
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but the country code is still empty.',
    );
    assert.strictEqual(
      fieldErrorText(`${testEls.cwfFieldTypePhoneNumberWithCountryCode}`).join(
        '|',
      ),
      `Country code is required`,
      'Error message updates correctly, showeing the field is revalidated number on focus out, after filling in the phone number input.',
    );
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await selectChoose(
      testEls.cwfFieldTypePhoneNumberWithCountryCode,
      'Andorra',
    );
    assert.ok(
      await passedValidation(
        `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
        validationTestHelpersDefaults,
      ),
      'Field passes validation when country code is selected, after previously failing validation twice.',
    );
    await fillIn(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 aaaa 4567 890',
    );
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);

    await failedValidation(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      validationTestHelpersDefaults,
      assert,
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but the country code is still empty.',
    );
    assert.strictEqual(
      fieldErrorText(`${testEls.cwfFieldTypePhoneNumberWithCountryCode}`).join(
        '|',
      ),
      `Phone number may only contain numbers and spaces`,
      'Error message updates correctly on focus out, after filling in the phone number input and including disallowed characters',
    );
    await focus(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await assert.notOk(
      await wasValidated(
        `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
        validationTestHelpersDefaults,
      ),
      'Validation is omitted on the field when the phone number input is focussed.',
    );
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    await assert.ok(
      await wasValidated(
        `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
        validationTestHelpersDefaults,
      ),
      'Validation is unhidden on the field when the phone number input is blurred.',
    );
  });

  test('Country code edited first', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await selectChoose(
      testEls.cwfFieldTypePhoneNumberWithCountryCode,
      'Andorra',
    );
    await assert.notOk(
      await wasValidated(
        `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
        validationTestHelpersDefaults,
      ),
      'Field is not validated when the country code is been selected, but the field has the input has not been interacted with.',
    );
    await fillIn(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`,
      '123 4444 4567 890',
    );
    await blur(`${testEls.cwfFieldTypePhoneNumberWithCountryCode} input`);
    assert.ok(
      await passedValidation(
        `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
        validationTestHelpersDefaults,
      ),
      'Field passes validation when phone number input if blurred, when country code was selected.',
    );
  });

  test('Submit clicked', async function (assert) {
    await visit('/docs/creating-custom-fields');
    await click(els.cwfSubmitButton);
    await failedValidation(
      `${testEls.cwfFieldTypePhoneNumberWithCountryCode}`,
      validationTestHelpersDefaults,
      assert,
      'Field still fails validation on focusOutPhoneNumberInput when the phone number is filled in, but the country code is still empty.',
    );
    assert.strictEqual(
      fieldErrorText(`${testEls.cwfFieldTypePhoneNumberWithCountryCode}`).join(
        '|',
      ),
      `Phone number can't be blank|Country code and number are required`,
      'Field fails validation with correct error messages on submit without any interaction with the field.',
    );
  });
});
