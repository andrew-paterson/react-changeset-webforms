import { visit, click, findAll } from 'react-qunit-test-helpers';
import { module, test, todo } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';

module('Acceptance | Checkbox group', function (hooks) {
  setupApplicationTest(hooks);

  test('Basic', async function (assert) {
    await visit('/docs/checkbox-group');
    await click(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption1} input`);
    assert.dom(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption1} input:checked`).exists('First checkbox is checked after being clicked');
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:checked`).length, 1, 'Only one checkbox is checked after first checkbox is clicked.');
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:not(:checked)`).length, 2, 'Two checkboxes are not clicked after first checkbox is clicked.');
    await click(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption2} input`);
    assert.dom(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption2} input:checked`).exists('Second checkbox is checked after being clicked');
    assert.dom(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption1} input:checked`).exists('First checkbox remains checked after second checkbox is clicked');
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:checked`).length, 2, 'Two checkboxes are checked after second checkbox is clicked.');
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:not(:checked)`).length, 1, 'One checkbox not checked after second checkbox is clicked.');
    await click(`${testEls.checkboxGroupExample1FormCheckboxes1FieldCheckboxOption3} input`);
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:checked`).length, 3, 'Three checkboxes are checked after third checkbox is clicked.');
    assert.strictEqual(findAll(`${testEls.checkboxGroupExample1} input:not(:checked)`).length, 0, 'Zero checkbox not checked after third checkbox is clicked.');
  });

  todo('With component label', async function (assert) {
    await visit('/docs/checkbox-group');
    assert.dom(`${testEls.checkboxGroupExample2FormCheckboxes2Field}`).hasText('Custom label components Option 1 This is a custom label component applied to all of the checkbox options Option 2 This is a custom label component applied to all of the checkbox options Option 3 This is a custom component for the label of one specific option. More info', 'Both field.optionLabelComponent and option.optionLabelComponent are loading correctly, and the option and props obejcts are passed in correctly to field.optionLabelComponent.');
    await click(`${testEls.checkboxGroupExample2} ${testEls.moreInfoToggler}`);
    assert.dom(`${testEls.checkboxGroupExample2FormCheckboxes2Field}`).hasText('Custom label components Option 1 This is a custom label component applied to all of the checkbox options Option 2 This is a custom label component applied to all of the checkbox options Option 3 This is a custom component for the label of one specific option. More info This text was passed to the label component dynamically for this option, via the optionLabelComponent.props object.', 'The option and props obejcts are correctly passed in to option.optionLabelComponent.');
  });

  test('With markdown label', async function (assert) {
    await visit('/docs/checkbox-group');
    assert.dom(`${testEls.checkboxGroupExample3FormCheckboxes3FieldCheckboxOptionOption1} strong`).exists('First option label correctly has markdown rendered into a strong tag.');
    assert.dom(`${testEls.checkboxGroupExample3FormCheckboxes3FieldCheckboxOptionOption2} em`).exists('Second option label correctly has markdown rendered into an em tag.');
    assert.dom(`${testEls.checkboxGroupExample3FormCheckboxes3FieldCheckboxOptionOption2}`).hasText('Option 2', 'Second option label has correct text after markdown is rendered.');
    assert.dom(`${testEls.checkboxGroupExample3FormCheckboxes3FieldCheckboxOptionOption2} label`).hasClass('form-check-label', 'Second label gets class globally applied to option labels');
  });
});
