import { visit } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';

module('Acceptance | Single checkbox', function (hooks) {
  setupApplicationTest(hooks);

  test('Basic', async function (assert) {
    await visit('/docs/single-checkbox');
    const parentFieldSelector = testEls.singleCheckboxBasicUse;
    assert.ok(true);
  });
});
