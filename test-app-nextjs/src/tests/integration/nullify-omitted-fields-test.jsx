/**
 * Integration | Component | Nullify omitted fields
 *
 * Port of ember-changeset-webforms/test-app/tests/integration/nullify-omitted-fields-test.js
 * Uses vitest + @testing-library/react instead of QUnit + @ember/test-helpers.
 */
import React, { useRef } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import ChangesetWebformComp from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import cloneDeep from 'lodash.clonedeep';

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

const submitButton = '[data-test-id="cwf-submit-form-button"]';
const clickerElement = '[data-test-class="cwf-clicker-element"]';
const emailFieldSel =
  '[data-test-id="nullify-omitted-fields-form-email-field"]';
const hasEmailFieldNoRadioOption =
  '[data-test-id="nullify-omitted-fields-form-has-email-field-radio-option-no"] input';

// ---------------------------------------------------------------------------
// Base schema
// ---------------------------------------------------------------------------

const baseSchema = {
  formSettings: { formName: 'nullifyOmittedFields' },
  fieldSettings: { resetWhenOmitted: false },
  fields: [
    {
      fieldId: 'name',
      fieldType: 'input',
      fieldLabel: 'Name',
      validationRules: [
        { validationMethod: 'validatePresence', arguments: true },
      ],
    },
    {
      fieldLabel: 'Email toggler',
      fieldId: 'emailToggler',
      fieldType: 'clicker',
      clickerText: 'Toggle email field',
    },
    {
      fieldId: 'email',
      fieldType: 'input',
      fieldLabel: 'Email',
      omitted: true,
      validationRules: [
        { validationMethod: 'validatePresence', arguments: true },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Wrapper component — collects callback state
// ---------------------------------------------------------------------------

function TestForm({
  formSchema,
  data,
  onSubmitData,
  onAfterGenerate,
  onUserInteraction,
}) {
  return (
    <ChangesetWebformComp
      formSchema={formSchema}
      data={data}
      submitData={onSubmitData}
      afterGenerateChangesetWebform={onAfterGenerate}
      onUserInteraction={onUserInteraction}
    />
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Integration | Component | Nullify omitted fields', () => {
  test('Omitted on load', async () => {
    let changesetEmailProp = null;
    let changesetWebform = null;

    const { container } = render(
      <TestForm
        formSchema={baseSchema}
        data={{ name: 'Steve Holt', email: 'steveholt@bluthcompany.com' }}
        onAfterGenerate={(cwf) => {
          changesetWebform = cwf;
          changesetEmailProp = cwf.changeset.data.email;
        }}
        onSubmitData={(data) => {
          changesetEmailProp = data.email;
        }}
      />,
    );

    // Email prop is in changeset data on load
    await waitFor(() => expect(changesetWebform).not.toBeNull());
    expect(changesetEmailProp).toBe('steveholt@bluthcompany.com');

    // Omitted email field is not rendered
    expect(container.querySelector(emailFieldSel)).toBeNull();

    // Submit — omitted field should be nullified
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => {
      expect(changesetEmailProp).toBeNull();
    });
  });

  test('Omitted by setting omitted prop in callback', async () => {
    let changesetEmailProp = null;
    let cwfInstance = null;

    // Schema without omitted on email field
    const schema = cloneDeep(baseSchema);
    const emailField = schema.fields.find((f) => f.fieldId === 'email');
    delete emailField.omitted;

    function handleUserInteraction(formField, changesetWebform) {
      if (formField.fieldId === 'emailToggler') {
        const ef = changesetWebform.fields.find((f) => f.fieldId === 'email');
        ef.setOmission(!ef.omitted);
      }
    }

    const { container } = render(
      <TestForm
        formSchema={schema}
        data={{ name: 'Steve Holt', email: 'steveholt@bluthcompany.com' }}
        onAfterGenerate={(cwf) => {
          cwfInstance = cwf;
          changesetEmailProp = cwf.changeset.data.email;
        }}
        onSubmitData={(data) => {
          changesetEmailProp = data.email;
        }}
        onUserInteraction={handleUserInteraction}
      />,
    );

    await waitFor(() => expect(cwfInstance).not.toBeNull());
    expect(changesetEmailProp).toBe('steveholt@bluthcompany.com');

    // Email field is visible
    await waitFor(() => {
      expect(container.querySelector(emailFieldSel)).not.toBeNull();
    });

    // Click toggler → omits email field
    await act(async () => {
      fireEvent.click(container.querySelector(clickerElement));
    });
    await waitFor(() => {
      expect(container.querySelector(emailFieldSel)).toBeNull();
    });

    // Submit — omitted field should be nullified
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => {
      expect(changesetEmailProp).toBeNull();
    });
  });

  test('Omitted dynamically', async () => {
    let changesetEmailProp = null;
    let cwfInstance = null;

    const schema = cloneDeep(baseSchema);
    schema.fields[1] = {
      fieldLabel: 'Has email',
      fieldId: 'hasEmail',
      fieldType: 'radioButtonGroup',
      options: ['Yes', 'No'],
    };
    const emailField = schema.fields.find((f) => f.fieldId === 'email');
    emailField.omitted = {
      returns: true,
      where: 'anyConditionsTrue',
      conditions: [{ fieldId: 'hasEmail', valueEquals: 'No' }],
    };

    const { container } = render(
      <TestForm
        formSchema={schema}
        data={{ name: 'Steve Holt', email: 'steveholt@bluthcompany.com' }}
        onAfterGenerate={(cwf) => {
          cwfInstance = cwf;
          changesetEmailProp = cwf.changeset.data.email;
        }}
        onSubmitData={(data) => {
          changesetEmailProp = data.email;
        }}
      />,
    );

    await waitFor(() => expect(cwfInstance).not.toBeNull());
    expect(changesetEmailProp).toBe('steveholt@bluthcompany.com');

    // Select "No" for hasEmail → email field becomes omitted
    await act(async () => {
      fireEvent.click(container.querySelector(hasEmailFieldNoRadioOption));
    });

    // Submit — omitted field should be nullified
    await act(async () => {
      fireEvent.click(container.querySelector(submitButton));
    });
    await waitFor(() => {
      expect(changesetEmailProp).toBeNull();
    });
  });
});
