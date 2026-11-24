import {
  visit,
  click,
  findAll,
  find,
  fillIn,
  focus,
  blur,
  typeIn,
} from 'react-qunit/test-helpers';
import { module, test, todo } from 'qunit';
import { setupApplicationTest } from 'react-qunit';
import testEls from './test-selectors';
import els from 'react-changeset-webforms/test-support/element-selectors';
import {
  passedValidation,
  failedValidation,
  allPassedValidation,
  allFailedValidation,
  allValidated,
  noneValidated,
  wasValidated,
  removeClones,
  addClone,
  clickSubmitButton,
} from 'react-changeset-webforms/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/test-support/validation-test-helpers-defaults';

module('Acceptance | Cloned fields', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/clonable-form-fields');
    // BEGIN-SNIPPET none-validated-test-helper-usage.js
    assert.ok(
      await noneValidated(
        `${testEls.clonableFieldBasics} ${els.cwfCloneWrapper}`,
        validationTestHelpersDefaults,
        [0, 1],
      ),
      'No clones are validated on insert',
    );
    // END-SNIPPET
    assert.notOk(
      await wasValidated(
        '[data-test-id="add-emails-form-emails-field-clone-1"]',
        validationTestHelpersDefaults,
      ),
      'Clone is not validated on insert, when insert is a validationEvent, but the clone is empty.',
    );
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 2 },
        'Min clones setting of 2 results in two cloned fields on load.',
      );
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfMaxClonesReached}`)
      .doesNotExist(
        'Max clones reached text does not display when the number of clones is below the value of the maxClones setting.',
      );
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfRemoveClone}`)
      .doesNotExist(
        'None of the clones has a remove clone button when the number of clones is equal to the the minClones setting.',
      );
    await focus(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"] input`,
    );
    await blur(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"] input`,
    );
    await failedValidation(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      validationTestHelpersDefaults,
      assert,
      'First clone fails validation when user focusses out and clone is empty.',
    );
    // BEGIN-SNIPPET was-validated-test-helper-usage.js
    assert.notOk(
      await wasValidated(
        `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"]`,
        validationTestHelpersDefaults,
      ),
      'Second clone is not validated on focus out of first clone.',
    );
    // END-SNIPPET
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfAddClone}`)
      .hasText(
        'Add email address',
        'Add clone button reflects custom cloneButtonText when passed to the field definition.',
      );
    // BEGIN-SNIPPET add-clone-test-helper-usage.js
    await addClone(testEls.clonableFieldBasics);
    // END-SNIPPET
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 3 },
        'A new clone is added after the add clone button is clicked.',
      );
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfRemoveClone}`)
      .exists(
        { count: 3 },
        'Each clone gets a remove clone button when the number of clones becomes greater than the minClones setting.',
      );
    await failedValidation(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
      validationTestHelpersDefaults,
      assert,
      'First clone validation status is not affected by clicking add clone button.',
    );
    assert.notOk(
      find(
        `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      ).classList.contains('valid'),
      'Second clone does not get class "valid" clicking add clone button.',
    );
    await click(`${testEls.clonableFieldBasics} ${els.cwfAddClone}`);
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfMaxClonesReached}`)
      .hasText(
        'Max clones reached.',
        'Max clones reached text displays when the number of clones is equal to the value of the maxClones setting.',
      );
    assert
      .dom(`${testEls.clonableFieldBasics} ${els.cwfAddClone}`)
      .doesNotExist('Add clone button disappears when maxClones is reached.');
    await fillIn(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"] input`,
      'lucille@bluthcompany.com',
    );
    await blur(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"] input`,
    );
    await passedValidation(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      validationTestHelpersDefaults,
      assert,
      'Second clone gets class "is-valid" when user focusses out and clone has a valid email.',
    );
    await fillIn(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-3"] input`,
      'email',
    );
    await blur(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-3"] input`,
    );
    await failedValidation(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-3"]`,
      validationTestHelpersDefaults,
      assert,
      'Third clone gets correct validation error messages when user focusses out and clone has invalid emailin the input.',
    );
    await removeClones(
      `${testEls.clonableFieldBasics} [data-test-id="add-emails-form-emails-field-clone-1"]`,
    );
    assert.strictEqual(
      findAll(els.cwfCloneWrapper)[0].getAttribute('data-test-id'),
      'add-emails-form-emails-field-clone-2',
      'Second clone correctly becomes first clone, after first clone is removed.',
    );
    assert.strictEqual(
      findAll(els.cwfCloneWrapper)[1].getAttribute('data-test-id'),
      'add-emails-form-emails-field-clone-3',
      'Third clone correctly becomes second clone, after first clone is removed.',
    );
  });

  test('With data', async function (assert) {
    await visit('/docs/clonable-form-fields');
    // BEGIN-SNIPPET all-validated-test-helper-usage.js
    assert.ok(
      await allValidated(
        `${testEls.clonableFieldWithData} ${els.cwfCloneWrapper}`,
        validationTestHelpersDefaults,
        [0, 1, 3, 4, 5],
      ),
      'All clones with data are validated on insert, where [insertWithData] is a clone validation method.',
    );
    // END-SNIPPET
    assert
      .dom(`${testEls.clonableFieldWithData} ${els.cwfCloneWrapper}`)
      .exists(
        { count: 6 },
        'Where number of items in the data array exceeds max clones, one cloned field is still generated for each item in the data array.',
      );
    // BEGIN-SNIPPET all-failed-validation-test-helper-usage.js
    assert.ok(
      await allFailedValidation(
        `${testEls.clonableFieldWithData} ${els.cwfCloneWrapper}`,
        validationTestHelpersDefaults,
        [0, 1],
      ),
      '1) Invalid clones fail validation on insert, where [insert] is a clone validation method. 2) The uniqueClone validation method works.',
    );
    // END-SNIPPET
    assert.notOk(
      await wasValidated(
        `${testEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-3"]`,
        validationTestHelpersDefaults,
      ),
      'Empty clone is not validated on insert, where [insert] is a clone validation method.',
    );
    // BEGIN-SNIPPET all-passed-validation-test-helper-usage.js
    assert.ok(
      await allPassedValidation(
        `${testEls.clonableFieldWithData} ${els.cwfCloneWrapper}`,
        validationTestHelpersDefaults,
        [3, 4, 5],
      ),
      'Valid clones pass validation on insert, where [insert] is a clone validation method',
    );
    // END-SNIPPET

    assert
      .dom(els.cwfMaxClonesReached)
      .exists('Max clones reached text shows on insert.');
    await removeClones(testEls.clonableFieldWithData, [0]);
    await passedValidation(
      `${testEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-2"]`,
      validationTestHelpersDefaults,
      assert,
      'Previously validated clone is revalidated after another clone is removed.',
    );
    assert.notOk(
      await wasValidated(
        `${testEls.clonableFieldWithData} [data-test-id="add-emails-form-emails-field-clone-3"]`,
        validationTestHelpersDefaults,
      ),
      'Previously un-validated clone is not revalidated after another clone is removed.',
    );
    // BEGIN-SNIPPET click-submit-button-test-helper-usage.js
    await clickSubmitButton(testEls.clonableFieldWithData);
    // END-SNIPPET
    assert
      .dom(`${testEls.cloneGroupEmails} > ${els.cwfFieldErrors}`)
      .hasText(
        'Too many emails (maximum is 4).',
        'Correct error message for the clone group on submit.',
      );
    await removeClones(testEls.clonableFieldWithData, [0]);
    assert
      .dom(`${testEls.cloneGroupEmails} > ${els.cwfFieldErrors}`)
      .doesNotExist('Clone group is re-validated after clone is removed');
    assert
      .dom(els.cwfMaxClonesReached)
      .exists(
        'Max clones reached text persists after multiple clone removals, where the existing number of clones is equal to the max allowed.',
      );
    // BEGIN-SNIPPET remove-clones-test-helper-usage.js
    await removeClones(testEls.clonableFieldWithData, [0]);
    // END-SNIPPET
    assert
      .dom(`${testEls.clonableFieldWithData} ${els.cwfAddClone}`)
      .exists(
        'Add clone button shows after clone removal, where the existing number of clones is less than to the max allowed.',
      );
    assert
      .dom(`${testEls.clonableFieldWithData} ${els.cwfMaxClonesReached}`)
      .doesNotExist(
        'Max clones reached text disappears after clone removal, where the existing number of clones is less than to the max allowed.',
      );
  });

  todo('When validation is shown when focussed', async function (assert) {
    await visit('/misc');
    assert
      .dom(`${testEls.clonableFieldCountries} ${els.cwfCloneWrapper}`)
      .exists({ count: 2 }, '2 clones exist on load.');
    const firstCloneSelector = `${testEls.clonableFieldCountries} [data-test-id="country-iso-codes-form-country-codes-field-clone-1"]`;

    const firstCloneInputSelector = `${firstCloneSelector} input`;
    const secondCloneSelector = `${testEls.clonableFieldCountries} [data-test-id="country-iso-codes-form-country-codes-field-clone-2"]`;
    await typeIn(firstCloneInputSelector, 'ZAFs');
    await failedValidation(
      firstCloneSelector,
      validationTestHelpersDefaults,
      assert,
      'First clone fails validation when user types a fourth character.',
    );
    assert.notOk(
      await wasValidated(secondCloneSelector, validationTestHelpersDefaults),
      'Second clone is not validated on keyUp in the input of the first clone.',
    );
    assert
      .dom(`${testEls.clonableFieldCountries} ${els.cwfAddClone}`)
      .hasText(
        'New Country ISO codes field',
        'Add clone button is present and has correct default text when minClones is specified, but maxClones is not.',
      );
  });
});
