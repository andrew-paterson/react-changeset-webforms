import { visit, find, click } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';

module('Acceptance | Clicker', function (hooks) {
  setupApplicationTest(hooks);

  test('Default clicker element', async function (assert) {
    await visit('/docs/clicker');
    const el = find(testEls.clickerExample1);
    el.scrollIntoView();
    assert.dom(`${testEls.clickerExample1} ${testEls.advancedField}`).doesNotExist('Advanced field not present on load.');
    assert.dom(`${testEls.clickerExample1} ${testEls.cwfClickerElement}`).hasText('Advanced options', 'Clicker button has correct text on load.');
    const clickerEl = find(`${testEls.clickerExample1} ${testEls.cwfClickerElement}`);
    assert.ok(clickerEl.classList.contains('cwf-clicker'), 'Clicker button has correct inherited classes classes on load.');
    assert.ok(clickerEl.classList.contains('btn-primary'), 'Clicker button has custom class "btn-primary" on load.');
    assert.ok(clickerEl.classList.contains('btn'), 'Clicker button has custom class "btn" on load.');
    await click(`${testEls.clickerExample1} ${testEls.cwfClickerElement} `);
    assert.dom(`${testEls.clickerExample1} ${testEls.clickerExample1FormAdvancedField}`).exists('Advanced field is present after clicking show advanced button.');
    await click(`${testEls.clickerExample1} ${testEls.cwfClickerElement} `);
    assert.dom(`${testEls.clickerExample1} ${testEls.clickerExample1FormAdvancedField}`).doesNotExist('Advanced field is not present after clicking show advanced button again.');
  });

  test('Custom component', async function (assert) {
    await visit('/docs/clicker');
    const el = find(testEls.clickerExample2);
    el.scrollIntoView();
    assert.dom(`${testEls.clickerExample2} ${testEls.clickerExample2FormAdvancedField}`).doesNotExist('Advanced field not present on load.');
    assert.dom(`${testEls.clickerExample2} ${testEls.cwfClickerElement}`).hasText('Advanced options', 'Clicker button has correct text on load.');
    const clickerEl = find(`${testEls.clickerExample2} ${testEls.cwfClickerElement}`);
    assert.ok(clickerEl.classList.contains('cwf-clicker'), 'Clicker button has correct inherited classes on load.');
    assert.ok(clickerEl.classList.contains('btn'), 'Clicker button has correct custom classes on load.');
    assert.ok(clickerEl.classList.contains('btn-danger'), 'Clicker button has correct classes based on props passed to the custom clicker component.');
    await click(`${testEls.clickerExample2} ${testEls.cwfClickerElement} `);
    assert.dom(`${testEls.clickerExample2} ${testEls.clickerExample2FormAdvancedField}`).exists('Advanced field is present after clicking show advanced button.');
    await click(`${testEls.clickerExample2} ${testEls.cwfClickerElement} `);
    assert.dom(`${testEls.clickerExample2} ${testEls.clickerExample2FormAdvancedField}`).doesNotExist('Advanced field is not present after clicking show advanced button again.');
  });
});
