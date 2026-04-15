import { visit, findAll, click } from 'react-qunit-test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import {} from 'ember-power-select/test-support';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { selectChoose } from 'ember-power-select/test-support';
import testEls from './test-selectors';

module('Acceptance | Power select', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/power-select');
    await clickTrigger(testEls.powerSelectExample1FormCountryField);
    assert.deepEqual(
      findAll('.ember-power-select-options .ember-power-select-option').map((item) => item.textContent.trim()),
      ['Aruba', 'Afghanistan', 'Angola', 'Albania', 'Andorra'],
      'Correct options displayed, where options is passed as an array of strings',
    );
    await selectChoose(testEls.powerSelectExample1FormCountryField, 'Angola');
    assert.dom('.ember-power-select-selected-item').hasText('Angola', 'Selected item component inserted with correct text when an option is clicked for the first time.');
    await selectChoose(testEls.powerSelectExample1FormCountryField, 'Aruba');
    assert.dom('.ember-power-select-selected-item').hasText('Aruba', 'Selected item component updated correctly when a second item is clicked.');
    await click('.ember-power-select-clear-btn');
    assert.dom('.ember-power-select-selected-item').doesNotExist('Selected item is removed clear button is clicked.');
  });

  test('Objects passed as options', async function (assert) {
    await visit('/docs/power-select');
    await clickTrigger(testEls.powerSelectExample2FormCountryField);
    assert.deepEqual(
      findAll('.ember-power-select-options .ember-power-select-option').map((item) => item.textContent.trim()),
      ['Aruba', 'Afghanistan', 'Angola', 'Albania', 'Andorra'],
      'Correct options displayed, where options is passed as an array of strings',
    );
    await selectChoose(testEls.powerSelectExample2FormCountryField, 'Angola');
    assert.dom('.ember-power-select-selected-item').hasText('Angola', 'Selected item component inserted with correct text when an option is clicked for the first time.');
    await selectChoose(testEls.powerSelectExample2FormCountryField, 'Aruba');
    assert.dom('.ember-power-select-selected-item').hasText('Aruba', 'Selected item component updated correctly when a second item is clicked.');
    assert.dom('.ember-power-select-clear-btn').doesNotExist('Clear button does not show after item is selcted, where `allowClear` is not set to true.');
  });
  test('With custom option and selected item components', async function (assert) {
    await visit('/docs/power-select');
    await clickTrigger(testEls.powerSelectExample3FormCountryField);
    assert.deepEqual(
      findAll('.ember-power-select-options .ember-power-select-option').map((item) => item.textContent.trim()),
      ['Aruba=> Data from @formField.optionComponent.props.data', 'Afghanistan=> Data from @formField.optionComponent.props.data', 'Angola=> Data from @formField.optionComponent.props.data', 'Albania=> Data from @formField.optionComponent.props.data', 'Andorra=> Data from @formField.optionComponent.props.data'],
      'Custom option component displayes country names, rather than codes.',
    );
    await selectChoose(testEls.powerSelectExample3FormCountryField, 'Angola');
    assert.dom('.ember-power-select-selected-item').hasText('Angola=> Data from @formField.extra.selectedItemComponent', 'Selected item component inserted with correct text, and receives data from @extra, when an option is clicked for the first time.');
  });

  test('With custom trigger component', async function (assert) {
    await visit('/docs/power-select');
    await clickTrigger();
    assert.dom(`${testEls.powerSelectExample4FormCountryField} .ember-power-select-trigger`).hasText(`I'm a custom trigger => Data from @formField.extra.triggerComponent`, 'Trigger component inserted with correct text and receives data from @extra.');
  });
});

// Clear button does not show if flase
// triggerComponent nad selecteditemComponent work, and receive `@extra` as expected
