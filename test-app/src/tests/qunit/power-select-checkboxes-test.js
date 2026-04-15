import { visit, findAll } from 'react-qunit-test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import { selectChoose } from 'ember-power-select/test-support';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import testEls from './test-selectors';

module('Acceptance | Power select checkboxes', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/power-select-checkboxes');
    assert.dom(`${testEls.powerSelectMultipleExample1FormCountryField} ${testEls.powerSelectCheckboxesSelectedItems}`).hasText('1 selected', 'Component correctly counts single selcted item on load.');
    await clickTrigger(testEls.powerSelectMultipleExample1FormCountryField);
    assert.ok(findAll('.ember-power-select-option input[type="checkbox"]')[0].checked, 'First option is checked on load');
    assert.notOk(findAll('.ember-power-select-option input[type="checkbox"]')[1].checked, 'Second option is not checked on load');
    await selectChoose(testEls.powerSelectMultipleExample1FormCountryField, 'AFG');
    assert.dom(`${testEls.powerSelectMultipleExample1FormCountryField} ${testEls.powerSelectCheckboxesSelectedItems}`).hasText('2 selected', 'Component correctly counts selected items after selecting the second item.');
    assert.ok(findAll('.ember-power-select-option input[type="checkbox"]')[0].checked, 'First option is checked after selecting the second item');
    assert.ok(findAll('.ember-power-select-option input[type="checkbox"]')[1].checked, 'Second option is checked after selecting the second item');
    await selectChoose(testEls.powerSelectMultipleExample1FormCountryField, 'AFG');
    assert.dom(`${testEls.powerSelectMultipleExample1FormCountryField} ${testEls.powerSelectCheckboxesSelectedItems}`).hasText('1 selected', 'Component correctly counts selected items after unselecting the second item.');
    assert.ok(findAll('.ember-power-select-option input[type="checkbox"]')[0].checked, 'First option is checked after unselecting the second item');
    assert.notOk(findAll('.ember-power-select-option input[type="checkbox"]')[1].checked, 'Second option is not checked after unselecting the second item');

    // TODO fieldValue correctly updated when options are selected or unselected
  });
});
