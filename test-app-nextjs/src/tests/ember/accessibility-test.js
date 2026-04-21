import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import testEls from '../acceptance/test-selectors';
import cloneDeep from 'lodash.clonedeep';
import allFieldTypesFieldSchema from 'test-app/utils/all-field-types-form-schema';
import accessibilityTestFunctions from './accessibility-test-functions';

module('Integration | Accessibility test', function (hooks) {
  setupRenderingTest(hooks);

  this.formSchema = {
    formSettings: {
      formName: 'ariaTest1',
    },
    fields: [
      {
        fieldId: 'emails',
        fieldLabel: 'Email',
        fieldType: 'input',
        inputType: 'email',
        hideLabel: true,
        validatesOn: ['$inherited', 'insertWithValue'],
        defaultValue: 'test',
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };

  test('ARIA label (Hidden field labels)', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = cloneDeep(allFieldTypesFieldSchema);
    this.formSchema.fields.forEach((field) => {
      field.hideLabel = true;
    });
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);

    assert.expect(14); // 2 per fields, 1 out of 8 fields ignored
    await accessibilityTestFunctions.checkAriaLabel(assert, this.fields);
  });

  test('ARIA label (Hidden field labels) - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await addCloneInEachField();
    assert.expect(28); // 2 per fields, 1 out of 8 fields ignored
    await accessibilityTestFunctions.checkAriaLabel(
      assert,
      getClones(this.fields),
      this,
    );
  });

  test('ATTR for - field label', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    assert.expect(11); // 3 fields with label for and 2 assertiosn each, 5 fields with no label for and 1 assertion each
    await accessibilityTestFunctions.checkAttrForFieldLabels(
      assert,
      this.fields,
    );
  });

  test('ATTR for - field label - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    this.formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.hideLabel = false;
    });
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await addCloneInEachField();
    assert.expect(22); // 3 fields with label for and 2 assertiosn each, 5 fields with no label for and 1 assertion each, 2 clones of each field
    await accessibilityTestFunctions.checkAttrForFieldLabels(
      assert,
      getClones(this.fields),
    );
  });

  test('ATTR for - radio and checkbox labels', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    assert.expect(6); // 3 radio group options, 3 checkbox group options, 1 single checkbox option;
    accessibilityTestFunctions.checkAttrForRadioAndCheckboxLabels(
      assert,
      this.fields,
    );
  });

  test('ATTR for - radio and checkbox labels - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await addCloneInEachField();
    assert.expect(12); // 3 radio group options, 3 checkbox group options, 1 single checkbox option;
    accessibilityTestFunctions.checkAttrForRadioAndCheckboxLabels(
      assert,
      getClones(this.fields),
    );
  });

  test('ARIA labelledby (Non semantic markup)', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    const assertionsPerField = 2;
    const expectedAssertionsLength = this.fields.length * assertionsPerField;
    assert.expect(expectedAssertionsLength);
    await accessibilityTestFunctions.checkAriaLabelledBy(assert, this.fields);
  });

  test('ARIA labelledby (Non semantic markup) - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    this.formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.hideLabel = false;
    });
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    assert.expect(32);
    await addCloneInEachField();
    await accessibilityTestFunctions.checkAriaLabelledBy(
      assert,
      getClones(this.fields),
    );
  });

  test('ARIA errormessage - no errors present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);

    await accessibilityTestFunctions.checkErrorsAbsent(assert, this.fields);
  });

  test('ARIA errormessage - no errors present - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await addCloneInEachField();
    await accessibilityTestFunctions.checkErrorsAbsent(
      assert,
      getClones(this.fields),
    );
  });

  test('ARIA errormessage - errors present', async function (assert) {
    this.formSchema = allFieldTypesFieldSchema;
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await accessibilityTestFunctions.checkErrorsPresent(assert, this.fields);
  });

  test('ARIA errormessage - errors present - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await addCloneInEachField();
    await accessibilityTestFunctions.checkErrorsPresent(
      assert,
      getClones(this.fields),
    );
  });

  test('ATTR required & ARIA required (All fields validate presence)', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    assert.expect(14); // 2 per field, checkbox group excluded
    await accessibilityTestFunctions.fieldsRequired(assert, this.fields);
  });

  test('ATTR required & ARIA required (All fields validate presence) - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await addCloneInEachField();
    assert.expect(28); // 2 per field, checkbox group excluded
    await accessibilityTestFunctions.fieldsRequired(
      assert,
      getClones(this.fields),
    );
  });

  test('ATTR required & ARIA required (No fields validate presence)', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = cloneDeep(allFieldTypesFieldSchema);
    this.formSchema.fields.forEach((field) => {
      delete field.validationRules;
    });
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    assert.expect(14); // 2 per field, checkbox group excluded
    await accessibilityTestFunctions.fieldsNotRequired(assert, this.fields);
  });

  test('ATTR required & ARIA required (No fields validate presence) - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    this.formSchema.fields.forEach((field) => {
      delete field.cloneFieldSchema.validationRules;
    });
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    assert.expect(28); // 2 per field, checkbox group excluded
    await addCloneInEachField();
    await accessibilityTestFunctions.fieldsNotRequired(
      assert,
      getClones(this.fields),
    );
  });

  test('ARIA describedby - field description not present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await accessibilityTestFunctions.checkDescribedByDescriptionPresent(
      assert,
      this.fields,
    );
  });

  test('ARIA describedby - field description not present - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await addCloneInEachField();
    await accessibilityTestFunctions.checkDescribedByDescriptionPresent(
      assert,
      getClones(this.fields),
    );
  });

  test('ARIA describedby - field description present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema3 = cloneDeep(allFieldTypesFieldSchema);
    this.formSchema3.fields.forEach((field) => {
      field.fieldDescription = `This is a description for the "${field.fieldLabel}" field.`;
    });
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema3}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await accessibilityTestFunctions.checkDescribedByDescriptionNotPresent(
      assert,
      this.fields,
    );
  });

  test('ARIA describedby - field description present - cloned fields', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = clonedFieldSchema();
    this.formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.fieldDescription = `This is a description for the "${field.fieldLabel}" field.`;
    });
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
          />`);
    await addCloneInEachField();
    await accessibilityTestFunctions.checkDescribedByDescriptionNotPresent(
      assert,
      getClones(this.fields),
    );
  });
});

function clonedFieldSchema() {
  const formSchema = cloneDeep(allFieldTypesFieldSchema);
  formSchema.fields = formSchema.fields.map((field) => {
    const newField = {
      fieldType: 'clone-group',
      fieldId: field.fieldId,
      fieldLabel: field.fieldLabel,
      cloneFieldSchema: field,
    };
    delete newField.cloneFieldSchema.fieldLabel;
    newField.cloneFieldSchema.hideLabel = true;
    delete newField.cloneFieldSchema.fieldId;
    return newField;
  });
  return formSchema;
}

function getClones(fields) {
  return fields.reduce((acc, field) => {
    acc = acc.concat(field.clonedFields);
    return acc;
  }, []);
}

async function addCloneInEachField() {
  const addFieldButtons = findAll(testEls.cwfAddCloneButton);
  for (var addFieldButton of addFieldButtons) {
    await click(addFieldButton);
  }
}

// required prop does not apply in a sematic way to checkbox groups (Ie that at least one must be selected)
// TODO title on all els when they are cloned
