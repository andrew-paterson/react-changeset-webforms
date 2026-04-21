/**
 * Accessibility test helper functions.
 *
 * Converted from Ember (assert.dom / @ember/test-helpers) to vitest +
 * @testing-library/jest-dom.  Each function receives a `container` (the
 * element returned by RTL's `render()`) instead of using Ember's global
 * `find`/`findAll`.
 */
import { fireEvent, act } from '@testing-library/react';

const cwfAddCloneButton = '[data-test-id="cwf-add-clone-button"]';

function q(container, selector) {
  return container.querySelector(selector);
}

function qa(container, selector) {
  return Array.from(container.querySelectorAll(selector));
}

function getFieldTypeBreakdown(field) {
  const map = [
    {
      fieldLabelElement: 'label',
      fieldType: 'input',
      selector: `[data-test-id="${field.id}"] input`,
      semanticMarkup: true,
    },
    {
      fieldLabelElement: 'label',
      fieldType: 'textarea',
      selector: `[data-test-id="${field.id}"] textarea`,
      semanticMarkup: true,
    },
    {
      fieldType: 'radioButtonGroup',
      fieldLabelElement: 'legend',
      selector: `fieldset[data-test-id="${field.id}"]`,
      requiredElementSelector: `[data-test-id="${field.id}"] input[type="radio"]`,
      semanticMarkup: true,
    },
    {
      fieldType: 'checkboxGroup',
      fieldLabelElement: 'legend',
      selector: `fieldset[data-test-id="${field.id}"]`,
      semanticMarkup: true,
    },
    {
      fieldType: 'singleCheckbox',
      fieldLabelElement: 'label',
      selector: `[data-test-id="${field.id}"] input[type="checkbox"]`,
      semanticMarkup: true,
    },
  ];
  return map.find((item) => item.fieldType === field.fieldType);
}

export async function checkAriaLabel(container, fields) {
  const ignoreFieldTypes = ['singleCheckbox'];
  fields
    .filter((field) => !ignoreFieldTypes.includes(field.fieldType))
    .forEach((field) => {
      const breakdown = getFieldTypeBreakdown(field);
      if (!breakdown) return;
      const fieldSelector = `[data-test-id="${field.id}"]`;
      const optionsWrapperEl = q(
        container,
        `${fieldSelector} [data-test-id="options-wrapper"]`,
      );
      const el = optionsWrapperEl
        ? optionsWrapperEl
        : q(container, breakdown.selector);
      const expectedLabel =
        field.fieldLabel ||
        `${field.masterFormField.fieldLabel} ${(field.index + 1).toString()}`;
      expect(el).toHaveAttribute('aria-label', expectedLabel);
      expect(el).not.toHaveAttribute('aria-labelledby');
    });
}

export async function checkAttrForFieldLabels(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) return;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    if (breakdown.semanticMarkup && breakdown.fieldLabelElement === 'label') {
      expect(q(container, breakdown.selector)).toHaveAttribute('id', field.id);
      expect(
        q(
          container,
          `${fieldSelector} ${breakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
        ),
      ).toHaveAttribute('for', field.id);
    } else {
      expect(
        q(
          container,
          `${fieldSelector} ${breakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
        ),
      ).not.toHaveAttribute('for');
    }
  });
}

export function checkAttrForRadioAndCheckboxLabels(container, fields) {
  fields.forEach((field) => {
    const fieldSelector = `[data-test-id="${field.id}"]`;
    if (
      !['radioButtonGroup', 'singleCheckbox', 'checkboxGroup'].includes(
        field.fieldType,
      )
    )
      return;
    const labelledRadio = q(
      container,
      `${fieldSelector} [data-test-labelled-radio-button]`,
    );
    const els = labelledRadio
      ? qa(container, `${fieldSelector} [data-test-labelled-radio-button]`)
      : qa(container, `${fieldSelector} [data-test-labelled-checkbox]`);
    els.forEach((el) => {
      const inputId = el.querySelector('input').id;
      expect(el.querySelector('label')).toHaveAttribute('for', inputId);
    });
  });
}

export async function checkAriaLabelledBy(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) return;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    expect(
      q(
        container,
        `${fieldSelector} ${breakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
      ),
    ).toHaveAttribute('id', `${field.id}-label`);
    if (breakdown.semanticMarkup) {
      expect(q(container, breakdown.selector)).not.toHaveAttribute(
        'aria-labelledby',
      );
    } else {
      expect(q(container, breakdown.selector)).toHaveAttribute(
        'aria-labelledby',
        `${field.id}-label`,
      );
    }
  });
}

export async function checkErrorsPresent(container, fields) {
  await act(async () => {
    const submitBtn = q(container, '[data-test-id="cwf-submit-form-button"]');
    if (submitBtn) fireEvent.click(submitBtn);
  });
  for (const field of fields) {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) continue;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    const errorsEl = q(
      container,
      `${fieldSelector} [data-test-class="cwf-field-errors"]`,
    );
    expect(errorsEl).toHaveAttribute('id', `${field.id}-errors`);
    expect(errorsEl).toHaveAttribute('role', 'alert');
    expect(q(container, breakdown.selector)).toHaveAttribute(
      'aria-errormessage',
      `${field.id}-errors`,
    );
  }
}

export function checkErrorsAbsent(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) return;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    expect(
      q(container, `${fieldSelector} [data-test-class="cwf-field-errors"]`),
    ).toBeNull();
    expect(q(container, breakdown.selector)).not.toHaveAttribute(
      'aria-errormessage',
    );
  });
}

export function fieldsRequired(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown || field.fieldType === 'checkboxGroup') return;
    const el = q(
      container,
      breakdown.requiredElementSelector || breakdown.selector,
    );
    if (breakdown.semanticMarkup) {
      expect(el).not.toHaveAttribute('aria-required');
      expect(el).toHaveAttribute('required');
    } else {
      expect(el).toHaveAttribute('aria-required', '');
      expect(el).not.toHaveAttribute('required');
    }
  });
}

export function fieldsNotRequired(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown || field.fieldType === 'checkboxGroup') return;
    const el = q(
      container,
      breakdown.requiredElementSelector || breakdown.selector,
    );
    expect(el).not.toHaveAttribute('required');
    expect(el).not.toHaveAttribute('aria-required');
  });
}

export function checkDescribedByDescriptionPresent(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) return;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    expect(
      q(
        container,
        `${fieldSelector} [data-test-class="cwf-field-description"]`,
      ),
    ).toBeNull();
    expect(q(container, breakdown.selector)).not.toHaveAttribute(
      'aria-describedby',
    );
  });
}

export function checkDescribedByDescriptionNotPresent(container, fields) {
  fields.forEach((field) => {
    const breakdown = getFieldTypeBreakdown(field);
    if (!breakdown) return;
    const fieldSelector = `[data-test-id="${field.id}"]`;
    expect(
      q(
        container,
        `${fieldSelector} [data-test-class="cwf-field-description"]`,
      ),
    ).toHaveAttribute('id', `${field.id}-description`);
    expect(q(container, breakdown.selector)).toHaveAttribute(
      'aria-describedby',
      `${field.id}-description`,
    );
  });
}

export async function addCloneInEachField(container) {
  const buttons = qa(container, cwfAddCloneButton);
  for (const btn of buttons) {
    await act(async () => {
      fireEvent.click(btn);
    });
  }
}

export function getClones(fields) {
  return fields.reduce(
    (acc, field) => acc.concat(field.clonedFields || []),
    [],
  );
}
