import { visit, click, fillIn, triggerKeyEvent, currentURL } from 'react-qunit-test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import { changesetWebformStateAsJSON } from 'react-changeset-webforms/src/test-support/helpers';
import testEls from '../acceptance/test-selectors';
import { selectChoose } from 'ember-power-select/test-support';
import { calendarSelect } from 'ember-power-calendar/test-support/helpers';
import moment from 'moment';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';

module('Acceptance | ChangesetWebform with controller query params', function (hooks) {
  setupApplicationTest(hooks);

  test('With data', async function (assert) {
    await visit('docs/changeset-webform-with-query-params?name=Steve Holt&inserted_from=2023-01-01&inserted_to=2023-01-31&sort=-name&page[number]=2&page[size]=20&authenticated=true');
    assert.deepEqual(
      changesetWebformStateAsJSON('[data-test-id="form-schema-from-queryparams-example-form"]'),
      [
        {
          fieldType: 'input',
          inputText: '1',
          label: 'Page number',
          name: 'form-schema-from-queryparams-example-form-form-number-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'input',
          inputText: '50',
          label: 'Page size',
          name: 'form-schema-from-queryparams-example-form-form-size-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-select',
          label: 'Sort',
          name: 'form-schema-from-queryparams-example-form-form-sort-field',
          powerSelect: {
            label: 'Sort',
            selectedItemText: 'Name Z-A',
          },
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'input',
          inputText: 'Steve Holt',
          label: 'Name',
          name: 'form-schema-from-queryparams-example-form-form-name-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-date-picker',
          inputText: '2023-01-01',
          label: 'First day',
          name: 'form-schema-from-queryparams-example-form-form-inserted-from-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-date-picker',
          inputText: '2023-01-31',
          label: 'Last day',
          name: 'form-schema-from-queryparams-example-form-form-inserted-to-field',
          validationStatus: 'not-applicable',
        },
      ],
      'Form rendered from URL query params is correct on load.',
    );
    await fillIn('[data-test-id="form-schema-from-queryparams-example-form-form-number-field"] input', '7');
    await triggerKeyEvent('[data-test-id="form-schema-from-queryparams-example-form-form-number-field"] input', 'keyup', 1);
    await fillIn('[data-test-id="form-schema-from-queryparams-example-form-form-size-field"] input', '100');
    await triggerKeyEvent('[data-test-id="form-schema-from-queryparams-example-form-form-size-field"] input', 'keyup', 1);
    await fillIn('[data-test-id="form-schema-from-queryparams-example-form-form-name-field"] input', 'Tobias Funke');
    await triggerKeyEvent('[data-test-id="form-schema-from-queryparams-example-form-form-name-field"] input', 'keyup', 1);
    await selectChoose('[data-test-id="form-schema-from-queryparams-example-form-form-sort-field"]', 'Oldest first');
    await clickTrigger('[data-test-id="form-schema-from-queryparams-example-form-form-inserted-from-field"]');
    await calendarSelect('[data-test-id="form-schema-from-queryparams-example-form-form-inserted-from-field"]', moment('1997-08-17', 'YYYY-MM-DD').toDate());
    await clickTrigger('[data-test-id="form-schema-from-queryparams-example-form-form-inserted-to-field"]');
    await calendarSelect('[data-test-id="form-schema-from-queryparams-example-form-form-inserted-to-field"]', moment('1997-08-21', 'YYYY-MM-DD').toDate());

    await click(testEls.cwfSubmitFormButton);
    checkUrlParams(
      [
        { paramName: 'number', expectedValue: '7' },
        { paramName: 'size', expectedValue: '100' },
        { paramName: 'name', expectedValue: 'Tobias Funke' },
        { paramName: 'sort', expectedValue: 'inserted_at' },
        { paramName: 'inserted_from', expectedValue: '1997-08-17 00:00:00' },
        { paramName: 'inserted_to', expectedValue: '1997-08-21 23:59:59' },
      ],
      currentURL(),
      assert,
      {
        assertionSuffix: 'after form is submitted with changes',
      },
    );
    // BEGIN-SNIPPET changeset-webform-state-as-json-test-helper-usage.js
    assert.deepEqual(
      changesetWebformStateAsJSON('[data-test-id="form-schema-from-queryparams-example-form"]'),
      [
        {
          fieldType: 'input',
          inputText: '7',
          label: 'Page number',
          name: 'form-schema-from-queryparams-example-form-form-number-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'input',
          inputText: '100',
          label: 'Page size',
          name: 'form-schema-from-queryparams-example-form-form-size-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-select',
          label: 'Sort',
          name: 'form-schema-from-queryparams-example-form-form-sort-field',
          powerSelect: {
            label: 'Sort',
            selectedItemText: 'Oldest first',
          },
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'input',
          inputText: 'Tobias Funke',
          label: 'Name',
          name: 'form-schema-from-queryparams-example-form-form-name-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-date-picker',
          inputText: '1997-08-17',
          label: 'First day',
          name: 'form-schema-from-queryparams-example-form-form-inserted-from-field',
          validationStatus: 'not-applicable',
        },
        {
          fieldType: 'power-date-picker',
          inputText: '1997-08-21',
          label: 'Last day',
          name: 'form-schema-from-queryparams-example-form-form-inserted-to-field',
          validationStatus: 'not-applicable',
        },
      ],
      'Form rendered from URL query params is correct on load.',
    );
    // END-SNIPPET
  });
});

function queryParamsAsObject(url) {
  const params = {};
  const parser = new URL(url, 'http://https://andrew-paterson.github.io/ember-changeset-webforms');
  for (const [key, value] of parser.searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

function checkUrlParams(params, url, assert, opts = {}) {
  params.forEach((param) => {
    assert.strictEqual(queryParamsAsObject(currentURL())[param.paramName], param.expectedValue, `[Check url params] ${param.paramName} params is correct in the url ${opts.assertionSuffix}.`);
  });
}
