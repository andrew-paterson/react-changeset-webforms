import { click, visit, select } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';

module('Acceptance | Select', function (hooks) {
  setupApplicationTest(hooks);

  test('String values with allowClear', async function (assert) {
    await visit('/docs/select');
    assert
      .dom(`[data-test-id="select-example1-form-country-field"] select`)
      .hasNoValue('Select is empty on load');
    assert
      .dom(
        `[data-test-id="select-example1-form-country-field"] ${testEls.clearSelectButton}`,
      )
      .doesNotExist('Clear button does not exist on load');
    assert
      .dom(
        `[data-test-id="select-example-one"] [data-test-id="selected-country-feedback"]`,
      )
      .hasText(
        'No country selected',
        'Feedback shows no country selected on load',
      );
    await select(
      `[data-test-id="select-example1-form-country-field"] select`,
      'South Africa',
    );
    assert
      .dom(
        `[data-test-id="select-example-one"] [data-test-id="selected-country-feedback"]`,
      )
      .hasText(
        'The selected country is South Africa',
        'Feedback shows the selected country after selection',
      );
    assert
      .dom(
        `[data-test-id="select-example1-form-country-field"] ${testEls.clearSelectButton}`,
      )
      .exists('Clear button is rendered when a value is selected');
    assert
      .dom(`[data-test-id="select-example1-form-country-field"] select`)
      .hasValue('South Africa', 'Select has the correct value after selection');
    await click(
      `[data-test-id="select-example1-form-country-field"] ${testEls.clearSelectButton}`,
    );
    assert
      .dom(`[data-test-id="select-example1-form-country-field"] select`)
      .hasNoValue('Select is empty after clicking the clear button.');
    assert
      .dom(
        `[data-test-id="select-example-one"] [data-test-id="selected-country-feedback"]`,
      )
      .hasText(
        'No country selected',
        'Feedback shows no country selected after clicking the clear button',
      );
  });

  test('Object values without allowClear', async function (assert) {
    await visit('/docs/select');
    assert
      .dom(`[data-test-id="select-example2-form-country-field"] select`)
      .hasNoValue('Select is empty on load');
    assert
      .dom(
        `[data-test-id="select-example2-form-country-field"] ${testEls.clearSelectButton}`,
      )
      .doesNotExist('Clear button does not exist on load');
    assert
      .dom(
        `[data-test-id="select-example-two"] [data-test-id="selected-country-feedback"]`,
      )
      .hasText(
        'No country selected',
        'Feedback shows no country selected on load',
      );
    await select(
      `[data-test-id="select-example2-form-country-field"] select`,
      'South Africa',
    );
    assert
      .dom(
        `[data-test-id="select-example-two"] [data-test-id="selected-country-feedback"]`,
      )
      .hasText(
        'The selected country code is za',
        'Feedback shows the selected country after selection',
      );
    assert
      .dom(
        `[data-test-id="select-example2-form-country-field"] ${testEls.clearSelectButton}`,
      )
      .doesNotExist('Clear button does not exist after making a selection');
    assert
      .dom(`[data-test-id="select-example2-form-country-field"] select`)
      .hasValue('za', 'Select has the correct value after selection');
  });
});
