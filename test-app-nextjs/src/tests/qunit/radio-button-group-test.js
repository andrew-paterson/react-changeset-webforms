import { visit, click } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';

module('Acceptance | Radio button group', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/radio-button-group');
    assert.dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`).doesNotExist('Current value not shown on load.');
    await click(`${testEls.radioButtonGroupExampleFormRgbColoursFieldRadioOptionFf0000} input`);
    assert.dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`).hasText('Selected colour: ff0000', 'Current value shows correct text after radio is checked, confirming that field value is updated correctly.');
    await click(`${testEls.radioButtonGroupExampleFormRgbColoursFieldRadioOption00ff00} input`);
    assert.dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`).hasText('Selected colour: 00ff00', 'Current value shows correct text after radio is checked, confirming that field value is updated correctly.');
  });

  test('With component label', async function (assert) {
    await visit('/docs/radio-button-group');
    assert.dom(`${testEls.radioButtonGroupExample2FormRadioButtons2Field}`).hasText('Custom label componentsOption 1This is a custom label component applied to all of the radio optionsOption 2This is a custom label component applied to all of the radio optionsOption 3 This is a custom component for the label of one specific radio optionMore info', 'Both field.optionLabelComponent and option.optionLabelComponent are loading correctly, and the option and props obejcts are passed in correctly to field.optionLabelComponent.');
    await click(`${testEls.radioButtonGroupExample2} ${testEls.moreInfoToggler}`);
    assert.dom(`${testEls.radioButtonGroupExample2FormRadioButtons2Field}`).hasText('Custom label componentsOption 1This is a custom label component applied to all of the radio optionsOption 2This is a custom label component applied to all of the radio optionsOption 3 This is a custom component for the label of one specific radio optionMore infoThis text was passed to the label component dynamically for this option, via the optionLabelComponent.props object.', 'The option and props obejcts are correctly passed in to option.optionLabelComponent.');
  });

  test('With markdown label', async function (assert) {
    await visit('/docs/radio-button-group');
    assert.dom(`${testEls.radioButtonGroupExample3FormRgbColoursFieldRadioOptionFf0000} strong`).exists('First option label correctly has markdown rendered into a strong tag.');
    assert.dom(`${testEls.radioButtonGroupExample3FormRgbColoursFieldRadioOption00ff00} em`).exists('Second option label correctly has markdown rendered into an em tag.');
    assert.dom(`${testEls.radioButtonGroupExample3FormRgbColoursFieldRadioOption00ff00}`).hasText('Green', 'Second option label has correct text after markdown is rendered.');
    assert.dom(`${testEls.radioButtonGroupExample3FormRgbColoursFieldRadioOption00ff00} label`).hasClass('form-check-label', 'Second label gets class globally applied to option labels');
  });
});
