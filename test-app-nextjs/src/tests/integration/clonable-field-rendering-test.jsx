/**
 * Integration | Component | Clonable field rendering
 *
 * Port of ember-changeset-webforms/test-app/tests/integration/clonable-field-rendering-test.js
 * Uses vitest + @testing-library/react instead of QUnit + @ember/test-helpers.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ChangesetWebformComp from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import cloneDeep from 'lodash.clonedeep';

// ---------------------------------------------------------------------------
// Selectors (from test-selectors.js)
// ---------------------------------------------------------------------------

const cwfCloneGroupItems = '[data-test-id="cwf-clone-group-items"]';
const cwfCloneGroupActions = '[data-test-id="cwf-clone-group-actions"]';
const cwfFieldLabelWrapper = '[data-test-class="cwf-field-label-wrapper"]';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if an element matching `siblingSelector` exists as a
 *  subsequent sibling of the first element matching `precedingSelector`. */
function siblingExists(container, precedingSelector, siblingSelector) {
  const preceding = container.querySelector(precedingSelector);
  if (!preceding) return false;
  let el = preceding.nextElementSibling;
  while (el) {
    if (el.matches(siblingSelector)) return true;
    el = el.nextElementSibling;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Base schema
// ---------------------------------------------------------------------------

const baseFormSchema = {
  formSettings: {
    formName: 'addEmails',
  },
  fields: [
    {
      fieldId: 'emails',
      fieldLabel: 'User emails',
      fieldType: 'clone-group',
      minClones: 2,
      maxClones: 4,
      validationRules: [
        {
          validationMethod: 'validateLength',
          arguments: {
            description: 'emails',
            message: 'Too many {description} (maximum is {max}).',
            max: 4,
          },
        },
      ],
      cloneButtonText: 'Add email address',
      cloneFieldSchema: {
        fieldLabel: 'Email',
        fieldType: 'input',
        inputType: 'email',
        hideLabel: true,
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'uniqueClone',
            arguments: { description: 'email' },
          },
        ],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Integration | Component | Clonable field rendering', () => {
  test('Clone group actions - default position', () => {
    const { container } = render(
      <ChangesetWebformComp formSchema={baseFormSchema} />,
    );
    expect(
      siblingExists(container, cwfCloneGroupItems, cwfCloneGroupActions),
    ).toBe(true);
  });

  test('Clone group actions - cloneGroupActionsPosition === cloneGroupWrapper', () => {
    const formSchema = cloneDeep(baseFormSchema);
    formSchema.fields[0].cloneGroupActionsPosition = 'cloneGroupWrapper';
    const { container } = render(
      <ChangesetWebformComp formSchema={formSchema} />,
    );
    expect(
      siblingExists(container, cwfCloneGroupItems, cwfCloneGroupActions),
    ).toBe(true);
  });

  test('Clone field actions - cloneGroupActionsPosition === labelWrapper', () => {
    const formSchema = cloneDeep(baseFormSchema);
    formSchema.fields[0].cloneGroupActionsPosition = 'labelWrapper';
    const { container } = render(
      <ChangesetWebformComp formSchema={formSchema} />,
    );
    expect(
      siblingExists(container, cwfFieldLabelWrapper, cwfCloneGroupItems),
    ).toBe(true);
  });
});
