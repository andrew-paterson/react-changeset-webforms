import { visit, focus, find, blur, findAll, typeIn, fillIn, triggerKeyEvent, click } from 'react-qunit-test-helpers';
import { module, test } from 'qunit';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import els from 'react-changeset-webforms/src/test-support/element-selectors';
import { passedValidation, failedValidation, wasValidated } from 'react-changeset-webforms/src/test-support/helpers';
import keyCodesMap from 'ember-changeset-webforms/utils/keycodes-map';
import { calendarSelect } from 'ember-power-calendar/test-support/helpers';
import moment from 'moment';
import validationTestHelpersDefaults from 'react-changeset-webforms/src/test-support/validation-test-helpers-defaults';

module('Acceptance | Power datepicker field', function (hooks) {
  setupApplicationTest(hooks);

  test('Date select', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepickerBasicUse;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    const fieldValueElement = find(`${parentFieldSelector} ${testEls.outputFieldValue}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample1FormStartDateField}`);
    const calendarElement = find(testEls.ecwPowerDatepickerDropdown);
    await calendarSelect(parentFieldSelector, moment('2022-11-13', 'YYYY-MM-DD').toDate());
    assert.dom(testEls.ecwPowerDatepickerDropdown).exists('Calendar is set to not close after date select by default.');
    assert.ok(find(testEls.dataDate('2022-11-13')).classList.contains('ember-power-calendar-day--selected'), 'The selected date is 2022-11-13.');

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      dateSelect: '2022-11-13',
      inputToUpdate: {
        element: calendarElement,
        description: 'Calendar',
      },
      expectedInputValuesAfterDateSelect: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Nov 13 2022 00:00:00 GMT+0200 (South Africa Standard Time)',
        },
        {
          textElement: fieldValueElement,
          description: 'Value output by field',
          value: '2022-11-13',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-13',
        },
      ],
    });
  });

  test('Date select with minDate 2022-11-10 and maxDate 2022-11-16', async function (assert) {
    await visit('/docs/power-datepicker');
    // TODO write test to check that calendarStartMonth works and is overridden by defaultValue or data passed in.
    const parentFieldSelector = testEls.powerDatepickerMinMaxDate;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    const fieldValueElement = find(`${parentFieldSelector} ${testEls.outputFieldValue}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample1cFormStartDateField}`);
    assert.dom(`${testEls.dataDate('2022-11-09')}:disabled`).exists('2022-11-09 is disabled in the calendar');
    assert.dom(`${testEls.dataDate('2022-11-17')}:disabled`).exists('2022-11-17 is disabled in the calendar');

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-01',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: '',
        },
        {
          textElement: fieldValueElement,
          description: 'Value output by field',
          value: '',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '',
        },
      ],
    });

    await calendarSelect(parentFieldSelector, moment('2022-11-13', 'YYYY-MM-DD').toDate());

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-17',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Nov 13 2022 00:00:00 GMT+0200 (South Africa Standard Time)',
        },
        {
          textElement: fieldValueElement,
          description: 'Value output by field',
          value: '2022-11-13',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-13',
        },
      ],
    });
  });

  test('Date select with advanced', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepickerAdvancedUse;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    const fieldValueElement = find(`${parentFieldSelector} ${testEls.outputFieldValue}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample1bFormStartDateField}`);
    const calendarElement = find(testEls.ecwPowerDatepickerDropdown);
    await calendarSelect(parentFieldSelector, moment('2022-11-13', 'YYYY-MM-DD').toDate());
    assert.dom(testEls.ecwPowerDatepickerDropdown).exists('Calendar is set to not close after date select by default.');
    assert.ok(find(testEls.dataDate('2022-11-13')).classList.contains('ember-power-calendar-day--selected'), 'The selected date is 2022-11-13.');

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: calendarElement,
        description: 'Calendar',
      },
      dateSelect: '2022-11-13',
      expectedInputValuesAfterDateSelect: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Nov 13 2022 23:59:59 GMT+0200 (South Africa Standard Time)',
        },
        {
          textElement: fieldValueElement,
          description: 'Value output by field',
          value: '2022-11-13 23:59:59',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-13',
        },
      ],
    });
  });

  test('Main input (24 hour format)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    assert.dom(testEls.powerDatepickerAmPmInput).doesNotExist('AM/PM input not shown when HH passed as the hour input format.');
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);
    const timeSelectorMinutesInput = find(testEls.timeSelectorFieldInputMinutes);
    const timeSelectorSecondsInput = find(testEls.timeSelectorFieldInputSeconds);
    const timeSelectorMillisecondsInput = find(testEls.timeSelectorFieldInputMilliseconds);
    await check(
      assert,
      {
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: dateTimeInput,
          description: 'Datetime',
        },
        fillIn: '2022-11-03 16:42:19.234',
        expectedInputValuesAfterKeyUp: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '2022-11-03 16:42:19.234',
          },
          {
            input: timeSelectorHourInput,
            description: 'Hours',
            value: '16',
          },
        ],
      },
      this,
    );
    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:51:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:81:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:51:57.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:51:81.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:51:57.873',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.873',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '873',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.873',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '873',
        },
      ],
    });
    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:51:57.88888888888',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:51:57.888',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '888',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-12-03 16:51:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sat Dec 03 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-12-03 16:51:19.234',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-12-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sat Dec 31 2022 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-12-31 16:51:19.234',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2028-12-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2028-12-31 16:51:19.234',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2028-02-31 16:51:19.234',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Dec 31 2028 16:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2028-12-31 16:51:19.234',
        },
      ],
    });
  });

  test('Main input (12 hour format)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample4FormStartDateField}`);
    assert.dom(testEls.powerDatepickerAmPmInput).exists('AM/PM input shown when h passed as the hour input format.');
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);
    const timeSelectorMinutesInput = find(testEls.timeSelectorFieldInputMinutes);
    const timeSelectorSecondsInput = find(testEls.timeSelectorFieldInputSeconds);

    const timeSelectorAmPmInput = find(testEls.powerDatepickerAmPmInput);
    await fillIn(dateTimeInput, '2022-11-03 03:42:19 pm');
    await triggerKeyEvent(dateTimeInput, 'keyup', 1);

    assert.strictEqual(find(dateTimeInput).value, '2022-11-03 2:42:19 pm', 'Date input rejects input with invalid format');
    assert.dom(rawDateTimeElement).hasText('Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)', 'Action to update date does not fire when input is invalid');

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 4:42:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 4:42:19 pm',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '4',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:19 pm',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 02:81:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:19 pm',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:19 pm',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '51',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 2:51:57 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 pm',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 pm',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 pm',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '57',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 2:51:57 am',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 am',
        },
        {
          input: timeSelectorAmPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 02:51:81 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 am',
        },
        {
          input: timeSelectorAmPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: 'trash',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:51:57 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:51:57 am',
        },
        {
          input: timeSelectorAmPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-12-03 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sat Dec 03 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-12-03 2:51:19 pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-12-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sat Dec 31 2022 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-12-31 2:51:19 pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2028-12-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2028-12-31 2:51:19 pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2028-02-31 2:51:19 pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Sun Dec 31 2028 14:51:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2028-12-31 2:51:19 pm',
        },
      ],
    });
  });

  test('Arrow keys - hour controls (24 hours format)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);

    await checkIncrements(assert, {
      iterations: 25,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 0,
      max: 23,
    });
    await checkIncrements(assert, {
      iterations: 4,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 0,
      max: 23,
      modifiers: {
        shiftKey: true,
      },
    });
  });

  test('Arrow keys - hour controls (12 hour format)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker12HourTimeSelect;
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample4FormStartDateField}`);
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);

    await checkIncrements(assert, {
      iterations: 13,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 1,
      max: 12,
      digits: 1,
    });
    await checkIncrements(assert, {
      iterations: 4,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Hours',
      min: 1,
      max: 12,
      digits: 1,
      modifiers: {
        shiftKey: true,
      },
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      keyName: 'arrowUp',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '2',
        },
      ],
    });
  });

  test('Arrow keys - minute controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect; //
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorMinuteInput = find(testEls.timeSelectorFieldInputMinutes);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMinuteInput,
        description: 'Minute',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Minutes',
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorMinuteInput,
        description: 'Minute',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Minutes',
      min: 0,
      max: 59,
      modifiers: {
        shiftKey: true,
      },
    });
  });

  test('Arrow keys - second controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorSecondsInput = find(testEls.timeSelectorFieldInputSeconds);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Seconds',
      min: 0,
      max: 59,
      upStart: 50,
      downStart: 10,
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Seconds',
      min: 0,
      max: 59,
      modifiers: {
        shiftKey: true,
      },
    });
  });

  test('Arrow keys - millisecond controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorMillisecondsInput = find(testEls.timeSelectorFieldInputMilliseconds);

    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 10,
      digits: 3,
      upStart: 990,
    });
    await checkIncrements(assert, {
      iterations: 8,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 100,
      upStart: 990,
      digits: 3,
      modifiers: {
        shiftKey: true,
      },
    });
    await checkIncrements(assert, {
      iterations: 12,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      parentFieldSelector: parentFieldSelector,
      inputDescription: 'Milliseconds',
      min: 0,
      max: 999,
      downStart: 900,
      upStart: 0,
      digits: 3,
      modifiers: {
        shiftKey: true,
        ctrlKey: true,
      },
    });
  });

  test('Typed input - hour controls (12 hour clock)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample4FormStartDateField}`);
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      fillIn: '21',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 12:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 12:42:19 pm',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '12',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 13:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 1:42:19 pm',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '1',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      fillIn: '8',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 20:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 8:42:19 pm',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '8',
        },
      ],
    });
  });

  test('Typed input - hour controls (24 hour clock)', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 23:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 23:42:19.234',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '23',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 00:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 00:42:19.234',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '00',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      typeInVal: '21',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 21:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 21:42:19.234',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '21',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorHourInput,
        description: 'Hour',
      },
      typeInVal: '08',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 08:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 08:42:19.234',
        },
        {
          input: timeSelectorHourInput,
          description: 'Hours',
          value: '08',
        },
      ],
    });
  });

  test('Typed input - minute controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorMinutesInput = find(testEls.timeSelectorFieldInputMinutes);

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes',
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:59:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '59',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes',
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:00:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:00:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '00',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMinutesInput,
        description: 'Minutes',
      },
      typeInVal: '34',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:34:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:34:19.234',
        },
        {
          input: timeSelectorMinutesInput,
          description: 'Minutes',
          value: '34',
        },
      ],
    });
  });

  test('Typed input - second controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorSecondsInput = find(testEls.timeSelectorFieldInputSeconds);

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds',
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:59 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:59.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '59',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds',
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:00 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:00.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '00',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorSecondsInput,
        description: 'Seconds',
      },
      typeInVal: '34',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:34 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:34.234',
        },
        {
          input: timeSelectorSecondsInput,
          description: 'Seconds',
          value: '34',
        },
      ],
    });
  });

  test('Typed input - millisecond controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorMillisecondsInput = find(testEls.timeSelectorFieldInputMilliseconds);

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      typeInVal: '9999',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:19.999',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '999',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      fillIn: '-1',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:19.000',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '000',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: timeSelectorMillisecondsInput,
        description: 'Milliseconds',
      },
      typeInVal: '334',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 14:42:19.334',
        },
        {
          input: timeSelectorMillisecondsInput,
          description: 'Milliseconds',
          value: '334',
        },
      ],
    });
  });

  test('AM PM controls', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker12HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample4FormStartDateField}`);
    await focus(dateTimeInput);
    const amPmInput = find(`${parentFieldSelector} ${testEls.powerDatepickerAmPmInput}`);
    assert.strictEqual(amPmInput.value, 'pm', 'AM/PM input begins with value "pm".');

    await check(assert, {
      expectedRawDateTimeAfterBlur: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      inputValuesAfterBlur: [
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      typeInVal: 'a',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 am',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      typeInVal: 'p',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      typeInVal: 'am',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 am',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      typeInVal: 'pm',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      typeInVal: 'zzzz',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      keyName: 'arrowUp',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 02:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 am',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'am',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      keyName: 'arrowDown',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'Datetime',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      keyName: 'delete',
      inputValuesAfterBlur: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });

    await check(assert, {
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: amPmInput,
        description: 'AM/PM',
      },
      keyName: 'backspace',
      inputValuesAfterBlur: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 2:42:19 pm',
        },
        {
          input: amPmInput,
          description: 'AM/PM',
          value: 'pm',
        },
      ],
    });
  });

  test('Millisecond digits', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepickerUnusualFormat;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample5FormStartDateField}`);
    const timeSelectorMillisecondsInput = find(testEls.timeSelectorFieldInputMilliseconds);
    assert.strictEqual(dateTimeInput.value, '03/11/2022 14:42:19.142', 'Fractional seconds in the date time input are trimmed to 3 decimals where format and passed data specifies more than 3 decimals');
    await focus(dateTimeInput);
    assert.strictEqual(timeSelectorMillisecondsInput.value, '142', 'Milliseconds input forced top 3 digits where format for milliseconds input specifies less than 3 digits.');
  });

  (test('Custom timeSelectorFields HH:mm', async function (assert) {
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepickerCustomTimeSelect;
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3aFormStartDateField}`);
    assert.dom(testEls.timeSelectorField).exists({ count: 2 }, 'Two time selector inputs exist');
    assert.strictEqual(findAll(testEls.timeSelectorFieldLabel)[0].textContent, 'Hour', 'First time selector field has label "Hour"');
    assert.strictEqual(findAll(testEls.timeSelectorFieldLabel)[1].textContent, 'Min', 'Second time selector field has label "Min"');
  }),
    test('Display date format differs from date format', async function (assert) {
      await visit('/docs/power-datepicker');
      const parentFieldSelector = testEls.powerDatepickerUnusualFormat;
      const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
      const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
      const fieldValueElement = find(`${parentFieldSelector} ${testEls.outputFieldValue}`);
      await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample5FormStartDateField}`);
      const timeSelectorMinutesInput = find(testEls.timeSelectorFieldInputMinutes);
      assert.dom(`${parentFieldSelector} ${testEls.outputFieldValue}`).hasText('14:42:19.142 03.11.2022', 'Value output by the field is [14:42:19.142 03.11.2022]');
      assert.strictEqual(dateTimeInput.value, '03/11/2022 14:42:19.142', 'Value of the date input field is [03/11/2022 14:42:19.142]');
      assert.dom(`${parentFieldSelector} ${testEls.rawDateTime}`).hasText('Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)', 'Field value is [Thu Nov 03 2022 14:42:19 GMT+0200 (South Africa Standard Time)].');
      await fillIn(dateTimeInput, '03/11/2022 14:41:19.142');
      await triggerKeyEvent(dateTimeInput, 'keyup', '1');

      assert.dom(`${parentFieldSelector} ${testEls.outputFieldValue}`).hasText('14:41:19.142 03.11.2022', 'Value output by the field is [14:41:19.142 03.11.2022]');
      assert.strictEqual(dateTimeInput.value, '03/11/2022 14:41:19.142', 'Value of the date input field is [03/11/2022 14:41:19.142]');
      assert.dom(`${parentFieldSelector} ${testEls.rawDateTime}`).hasText('Thu Nov 03 2022 14:41:19 GMT+0200 (South Africa Standard Time)', 'Field value is [Thu Nov 03 2022 14:41:19 GMT+0200 (South Africa Standard Time)].');

      await check(assert, {
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: timeSelectorMinutesInput,
          description: 'Minutes',
        },
        typeInVal: '59',
        expectedInputValuesAfterKeyUp: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Thu Nov 03 2022 14:59:19 GMT+0200 (South Africa Standard Time)',
          },
          {
            textElement: fieldValueElement,
            description: 'Value output by field',
            value: '14:59:19.142 03.11.2022',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '03/11/2022 14:59:19.142',
          },
        ],
      });
    }));

  test('Misc', async function (assert) {
    // Main input (24 hour format)
    // Filling in Msec value of more than 8 digits simply chops off all but the first three
    await visit('/docs/power-datepicker');
    const parentFieldSelector = testEls.powerDatepicker24HourTimeSelect;
    const dateTimeInput = find(`${parentFieldSelector} ${testEls.powerDatepickerInput}`);
    const rawDateTimeElement = find(`${parentFieldSelector} ${testEls.rawDateTime}`);
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    const timeSelectorHourInput = find(testEls.timeSelectorFieldInputHour);
    assert.notOk(await wasValidated(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`, validationTestHelpersDefaults), 'Field is not validated on insert.');
    await check(
      assert,
      {
        header: 'Date time is updated correctly after filling in the input',
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: dateTimeInput,
          description: 'Datetime',
        },
        fillIn: '2022-11-03 16:42:19.234',
        expectedInputValuesAfterKeyUp: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '2022-11-03 16:42:19.234',
          },
          {
            input: timeSelectorHourInput,
            description: 'Hours',
            value: '16',
          },
        ],
      },
      this,
    );
    await passedValidation(`${testEls.powerDatapickerExample3FormStartDateField}`, validationTestHelpersDefaults, assert, ' after typing a date in the input.');
    await click(els.datetimePickerClearDatetime);
    await failedValidation(`${testEls.powerDatapickerExample3FormStartDateField}`, validationTestHelpersDefaults, assert, ' after clearing the date input by clicking the clear button.');
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);
    await check(
      assert,
      {
        header: 'Time is set to 00:00:00.000 when date is selected from calendar on an empty field',
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: dateTimeInput,
          description: 'Datetime',
        },
        dateSelect: '2022-11-14',
        expectedInputValuesAfterDateSelect: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Mon Nov 14 2022 00:00:00 GMT+0200 (South Africa Standard Time)',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '2022-11-14 00:00:00.000',
          },
        ],
      },
      this,
    );
    await clickTrigger(`${parentFieldSelector} ${testEls.powerDatapickerExample3FormStartDateField}`);

    await check(assert, {
      header: 'Date time is updated correctly after filling in the input',
      parentFieldSelector: parentFieldSelector,
      inputToUpdate: {
        element: dateTimeInput,
        description: 'Datetime',
      },
      fillIn: '2022-11-03 16:42:19.555',
      expectedInputValuesAfterKeyUp: [
        {
          textElement: rawDateTimeElement,
          description: 'Native JS date format',
          value: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
        },
        {
          input: dateTimeInput,
          description: 'Datetime',
          value: '2022-11-03 16:42:19.555',
        },
      ],
    });
    await check(
      assert,
      {
        header: `TIME IS REMEMBERED WHEN A NEW DATE IS SELECTED FROM THE CALENDAR`,
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: dateTimeInput,
          description: 'Datetime',
        },
        dateSelect: '2022-11-14',
        expectedInputValuesAfterDateSelect: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Mon Nov 14 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '2022-11-14 16:42:19.555',
          },
        ],
      },
      this,
    );
    await check(
      assert,
      {
        header: `Milliseconds cut to three digits if longer, and result accepted as valid input`,
        parentFieldSelector: parentFieldSelector,
        inputToUpdate: {
          element: dateTimeInput,
          description: 'Datetime',
        },
        fillIn: '2022-11-03 16:42:19.12345678',
        expectedInputValuesAfterKeyUp: [
          {
            textElement: rawDateTimeElement,
            description: 'Native JS date format',
            value: 'Thu Nov 03 2022 16:42:19 GMT+0200 (South Africa Standard Time)',
          },
          {
            input: dateTimeInput,
            description: 'Datetime',
            value: '2022-11-03 16:42:19.123',
          },
        ],
      },
      this,
    );
    // Testing a backspace keypress in an input not possible
    // https://github.com/emberjs/ember-test-helpers/issues/626
  });
});

async function check(assert, opts) {
  if (opts.header) {
    assert.ok(true, `# ${opts.header.toUpperCase()}`);
  }
  const { keys } = keyCodesMap;
  const element = opts.inputToUpdate.element;

  ['expectedInputValuesAfterKeyUp'].forEach((eventName) => {
    opts[eventName] = opts[eventName] || [];
    opts[eventName].forEach((item) => {
      if (item.input) {
        item.initialValue = item.input.value;
      } else if (item.textElement) {
        item.initialValue = item.textElement.textContent;
      }
    });
  });

  let assertionPrefix;

  if (!opts.dateSelect) {
    await focus(element);
  }

  if (opts.dateSelect) {
    await calendarSelect(opts.parentFieldSelector, moment(opts.dateSelect, 'YYYY-MM-DD').toDate());
    assertionPrefix = `Select "${opts.dateSelect}" in ${opts.inputToUpdate.description}`;
  } else if (opts.typeInVal) {
    await fillIn(element, '');
    await triggerKeyEvent(element, 'keyup', '1');
    await typeIn(element, opts.typeInVal);
    assertionPrefix = `Type in "${opts.typeInVal}" in ${opts.inputToUpdate.description} input`;
  } else if (opts.fillIn) {
    await focus(element);
    await fillIn(element, opts.fillIn);
    await triggerKeyEvent(element, 'keyup', 1);
    assertionPrefix = `Fill in "${opts.fillIn}" in ${opts.inputToUpdate.description} input`;
  } else if (opts.keyName) {
    await triggerKeyEvent(element, 'keydown', keys[opts.keyName], opts.modifiers);
    await triggerKeyEvent(element, 'keyup', keys[opts.keyName], opts.modifiers);
    let keysDescription = '';
    for (const key in opts.modifiers || {}) {
      keysDescription += `${key.replace('Key', '')} + `;
    }
    keysDescription += opts.keyName;
    assertionPrefix = `Special key "${keysDescription}" in ${opts.inputToUpdate.description} input`;
  } else {
    assertionPrefix = `Focus in and blur of ${opts.inputToUpdate.description} input`;
  }

  // TODO this should cbe clearer in the test when it fails
  const valueComparison = (initial, after) => {
    if (!initial) {
      return `IS SET TO ${after}`;
    }
    if (initial === after) {
      return `REMAINS ${initial}`;
    } else {
      return `UPDATES from ${initial} to ${after}`;
    }
  };

  const checkExpectedVals = (event) => {
    for (const item of opts[`expectedInputValuesAfter${event}`] || []) {
      if (item.input) {
        assert.strictEqual(item.input.value, item.value, `[${assertionPrefix} => ${event}] ${item.description} input ${valueComparison(item.initialValue, item.input.value)}`);
      } else if (item.textElement) {
        assert.dom(item.textElement).hasText(item.value, `[${assertionPrefix} => ${event}] ${item.description} element ${valueComparison(item.initialValue, item.textElement.textContent)}`);
      }
    }
  };

  if (!opts.dateSelect) {
    checkExpectedVals('KeyUp');
    await blur(element);
    checkExpectedVals('Blur');
    assert.ok(true, '---------------------------------------');
  } else {
    checkExpectedVals('DateSelect');
    assert.ok(true, '---------------------------------------');
  }
}

async function checkIncrements(assert, opts) {
  const downStart = opts.downStart;
  const upStart = opts.upStart || '0';
  const digits = opts.digits || 2;

  await fillIn(opts.inputToUpdate.element, upStart);
  await triggerKeyEvent(opts.inputToUpdate.element, 'keyup', '1');

  const iterations = Array.from({ length: opts.iterations }, (_, i) => i + 1);

  let increment = 1;
  if ((opts.modifiers || {}).shiftKey && (opts.modifiers || {}).ctrlKey) {
    increment = 100;
  } else if ((opts.modifiers || {}).shiftKey) {
    increment = 10;
  }

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.inputToUpdate.element.value);
    const expectedValue = currentValue + increment > opts.max ? opts.max : currentValue + increment;
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      inputToUpdate: opts.inputToUpdate,
      keyName: 'arrowUp',
      modifiers: opts.modifiers,
      expectedInputValuesAfterKeyUp: [
        {
          input: opts.inputToUpdate.element,
          description: opts.inputDescription,
          value: expectedValue.toLocaleString('en-US', {
            minimumIntegerDigits: digits,
            useGrouping: false,
          }),
        },
      ],
    });
  }

  if (downStart) {
    await fillIn(opts.inputToUpdate.element, downStart);
    await triggerKeyEvent(opts.inputToUpdate.element, 'keyup', '1');
  }

  for (const _iteration of iterations) {
    const currentValue = parseInt(opts.inputToUpdate.element.value);
    const expectedValue = currentValue - increment < opts.min ? opts.min : currentValue - increment;
    await check(assert, {
      parentFieldSelector: opts.parentFieldSelector,
      inputToUpdate: opts.inputToUpdate,
      keyName: 'arrowDown',
      modifiers: opts.modifiers,
      expectedInputValuesAfterKeyUp: [
        {
          input: opts.inputToUpdate.element,
          description: opts.inputDescription,
          value: expectedValue.toLocaleString('en-US', {
            minimumIntegerDigits: digits,
            useGrouping: false,
          }),
        },
      ],
    });
  }
}
