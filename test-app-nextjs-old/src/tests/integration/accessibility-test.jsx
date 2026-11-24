/**
 * Integration | Accessibility test
 *
 * Port of ember-changeset-webforms/test-app/tests/integration/accessibility-test.js
 * Uses vitest + @testing-library/react instead of QUnit + @ember/test-helpers.
 */
import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { describe, test } from 'vitest';
import ChangesetWebformComp from 'react-changeset-webforms/components/ChangesetWebform.jsx';
import cloneDeep from 'lodash.clonedeep';
import allFieldTypesFieldSchema from '../../utils/all-field-types-form-schema.js';
import {
  checkAriaLabel,
  checkAttrForFieldLabels,
  checkAttrForRadioAndCheckboxLabels,
  checkAriaLabelledBy,
  checkErrorsPresent,
  checkErrorsAbsent,
  fieldsRequired,
  fieldsNotRequired,
  checkDescribedByDescriptionPresent,
  checkDescribedByDescriptionNotPresent,
  addCloneInEachField,
  getClones,
} from '../helpers/accessibility-test-functions.js';
import appConfig from '../../utils/app-defaults.js';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Renders the form, waits for afterGenerateChangesetWebform, returns
 * { container, fields }.
 */
async function renderForm(formSchema) {
  let fields = [];
  let container;
  await act(async () => {
    ({ container } = render(
      <ChangesetWebformComp
        formSchema={formSchema}
        appConfig={appConfig}
        afterGenerateChangesetWebform={(cwf) => {
          fields = cwf.fields;
        }}
      />,
    ));
  });
  return { container, fields };
}

/**
 * Builds the clone-group schema wrapping allFieldTypesFieldSchema.
 */
function clonedFieldSchema() {
  const formSchema = cloneDeep(allFieldTypesFieldSchema);
  formSchema.fields = formSchema.fields.map((field) => {
    const cloneFieldSchema = { ...field };
    delete cloneFieldSchema.fieldLabel;
    delete cloneFieldSchema.fieldId;
    cloneFieldSchema.hideLabel = true;
    return {
      fieldType: 'clone-group',
      fieldId: field.fieldId,
      fieldLabel: field.fieldLabel,
      cloneFieldSchema,
    };
  });
  return formSchema;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Integration | Accessibility test', () => {
  // ── ARIA label ────────────────────────────────────────────────────────────

  test('ARIA label (Hidden field labels)', async () => {
    const formSchema = cloneDeep(allFieldTypesFieldSchema);
    formSchema.fields.forEach((field) => {
      field.hideLabel = true;
    });
    const { container, fields } = await renderForm(formSchema);
    await checkAriaLabel(container, fields);
  });

  test('ARIA label (Hidden field labels) - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    await checkAriaLabel(container, getClones(fields));
  });

  // ── ATTR for ──────────────────────────────────────────────────────────────

  test('ATTR for - field label', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    await checkAttrForFieldLabels(container, fields);
  });

  test('ATTR for - field label - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.hideLabel = false;
    });
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    await checkAttrForFieldLabels(container, getClones(fields));
  });

  test('ATTR for - radio and checkbox labels', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    checkAttrForRadioAndCheckboxLabels(container, fields);
  });

  test('ATTR for - radio and checkbox labels - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    checkAttrForRadioAndCheckboxLabels(container, getClones(fields));
  });

  // ── ARIA labelledby ───────────────────────────────────────────────────────

  test('ARIA labelledby (Non semantic markup)', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    await checkAriaLabelledBy(container, fields);
  });

  test('ARIA labelledby (Non semantic markup) - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.hideLabel = false;
    });
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    await checkAriaLabelledBy(container, getClones(fields));
  });

  // ── ARIA errormessage ─────────────────────────────────────────────────────

  test('ARIA errormessage - no errors present', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    checkErrorsAbsent(container, fields);
  });

  test('ARIA errormessage - no errors present - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    checkErrorsAbsent(container, getClones(fields));
  });

  test('ARIA errormessage - errors present', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    await checkErrorsPresent(container, fields);
  });

  test('ARIA errormessage - errors present - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    await checkErrorsPresent(container, getClones(fields));
  });

  // ── required / aria-required ──────────────────────────────────────────────

  test('ATTR required & ARIA required (All fields validate presence)', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    fieldsRequired(container, fields);
  });

  test('ATTR required & ARIA required (All fields validate presence) - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    fieldsRequired(container, getClones(fields));
  });

  test('ATTR required & ARIA required (No fields validate presence)', async () => {
    const formSchema = cloneDeep(allFieldTypesFieldSchema);
    formSchema.fields.forEach((field) => {
      delete field.validationRules;
    });
    const { container, fields } = await renderForm(formSchema);
    fieldsNotRequired(container, fields);
  });

  test('ATTR required & ARIA required (No fields validate presence) - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    formSchema.fields.forEach((field) => {
      delete field.cloneFieldSchema.validationRules;
    });
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    fieldsNotRequired(container, getClones(fields));
  });

  // ── aria-describedby ──────────────────────────────────────────────────────

  test('ARIA describedby - field description not present', async () => {
    const { container, fields } = await renderForm(allFieldTypesFieldSchema);
    checkDescribedByDescriptionPresent(container, fields);
  });

  test('ARIA describedby - field description not present - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    checkDescribedByDescriptionPresent(container, getClones(fields));
  });

  test('ARIA describedby - field description present', async () => {
    const formSchema = cloneDeep(allFieldTypesFieldSchema);
    formSchema.fields.forEach((field) => {
      field.fieldDescription = `This is a description for the "${field.fieldLabel}" field.`;
    });
    const { container, fields } = await renderForm(formSchema);
    checkDescribedByDescriptionNotPresent(container, fields);
  });

  test('ARIA describedby - field description present - cloned fields', async () => {
    const formSchema = clonedFieldSchema();
    formSchema.fields.forEach((field) => {
      field.cloneFieldSchema.fieldDescription = `This is a description for the "${field.fieldLabel}" field.`;
    });
    const { container, fields } = await renderForm(formSchema);
    await addCloneInEachField(container);
    checkDescribedByDescriptionNotPresent(container, getClones(fields));
  });
});
