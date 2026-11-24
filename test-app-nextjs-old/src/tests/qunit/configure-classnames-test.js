import { visit, find, click, focus, blur, fillIn, triggerKeyEvent, waitFor } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';

function checkClasses(selector, expectedClasses, assert, options = {}) {
  const el = find(selector);
  const classes = Array.from(el.classList);
  assert.deepEqual(classes.sort(), expectedClasses.sort(), `${options.assertionPrefix ? `[${options.assertionPrefix}] ` : ''}Classes for ${selector} are correct ${options.assertionSuffix ? options.assertionSuffix : ''}`);
}

module('Acceptance | Configuring class names', function (hooks) {
  setupApplicationTest(hooks);

  test('App wide config', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="app-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'form-label'], assert, {
      assertionPrefix: 'App wide label element classes',
      assertionSuffix: 'for main field label.',
    });
    checkClasses('[data-test-id="app-class-names-form-radio-buttons1-field-radio-option-1"] label', ['app-wide-label-element-class', 'app-wide-radio-button-group-label-element-class', 'form-check-label'], assert, {
      assertionPrefix: 'App wide label element classes',
      assertionSuffix: 'for radio option label.',
    });
  });

  test('Form wide config', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="form-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'form-wide-label-class', 'form-label'], assert, {
      assertionPrefix: 'Form wide label element classes',
      assertionSuffix: 'for main field label.',
    });
    checkClasses('[data-test-id="form-class-names-form-radio-buttons1-field-radio-option-1"] label', ['app-wide-label-element-class', 'form-wide-label-class', 'app-wide-radio-button-group-label-element-class', 'form-check-label'], assert, {
      assertionPrefix: 'Form wide label element classes',
      assertionSuffix: 'for radio option label.',
    });
  });

  test('Field level config', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="field-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'form-label', 'class-for-the-field-label-of-this-field'], assert, {
      assertionPrefix: 'Field level label element classes',
      assertionSuffix: 'for main field label with $inherited.',
    });
    checkClasses('[data-test-id="field-class-names-form-radio-buttons1-field-radio-option-1"] label', ['class-for-all-label-els-in-this-field'], assert, {
      assertionPrefix: 'Field level label element classes',
      assertionSuffix: 'for radio option label without $inherited.',
    });
  });

  test('All instances of a field type within a form', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="field-type-within-form-classnames-form-name-field-label"]', ['app-wide-label-element-class', 'form-wide-label-class', 'form-label'], assert, {
      assertionPrefix: 'Form specific field types',
      assertionSuffix: 'where $inherited is used.',
    });

    checkClasses('[data-test-id="field-type-within-form-classnames-form-radio-buttons1-field-radio-option-1"] label', ['form-wide-radio-button-label-el-class'], assert, {
      assertionPrefix: 'Form specific field types',
      assertionSuffix: 'where $inherited is not used.',
    });
    checkClasses('[data-test-id="field-type-within-form-classnames-form-radio-buttons1-field-radio-option-2"] label', ['form-wide-radio-button-label-el-class'], assert, {
      assertionPrefix: 'Form specific field types',
      assertionSuffix: 'where $inherited is not used.',
    });
  });

  test('Inheritance', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="inherit-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'form-wide-label-class', 'form-label'], assert, {
      assertionPrefix: 'Interitance',
      assertionSuffix: 'where $inherited is used.',
    });

    checkClasses('[data-test-id="override-class-names-form-name-field-label"]', ['form-wide-label-class', 'form-label'], assert, {
      assertionPrefix: 'Interitance',
      assertionSuffix: 'where $inherited is not used.',
    });
  });

  test('Dynamically added validation classes', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    checkClasses('[data-test-id="validation-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'form-label'], assert, {
      assertionPrefix: 'Validation classes',
      assertionSuffix: 'when the field is unvalidated',
    });
    await focus('[data-test-id="validation-class-names-form-name-field"] input');
    await blur('[data-test-id="validation-class-names-form-name-field"] input');
    checkClasses('[data-test-id="validation-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'is-invalid', 'form-label'], assert, {
      assertionPrefix: 'Validation classes',
      assertionSuffix: 'when the field is unvalidated',
    });
    await fillIn('[data-test-id="validation-class-names-form-name-field"] input', 'Test');
    await triggerKeyEvent('[data-test-id="validation-class-names-form-name-field"] input', 'keyup', 13);
    checkClasses('[data-test-id="validation-class-names-form-name-field-label"]', ['app-wide-label-element-class', 'is-valid', 'form-label'], assert, {
      assertionPrefix: 'Validation classes',
      assertionSuffix: 'when the field is unvalidated',
    });
  });
});
