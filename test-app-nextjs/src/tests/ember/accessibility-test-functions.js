import { click, find, findAll } from '@ember/test-helpers';
import testEls from '../acceptance/test-selectors';

export default {
  async checkAriaLabel(assert, fields) {
    const ignoreFieldTypes = ['singleCheckbox'];
    fields
      .filter((field) => !ignoreFieldTypes.includes(field.fieldType))
      .forEach((field) => {
        const fieldTypeBreakdown = getFieldTypeBreakdown(field);
        const fieldSelector = `[data-test-id="${field.id}"]`;
        const optionsWrapperEl = find(
          `${fieldSelector} [data-test-id="options-wrapper"]`,
        );
        const ariaLabelElSelector =
          optionsWrapperEl || fieldTypeBreakdown.selector;
        assert
          .dom(ariaLabelElSelector)
          .hasAria(
            'label',
            field.fieldLabel ||
              `${field.masterFormField.fieldLabel} ${(field.index + 1).toString()}`,
          );
        // Replace if block with `assert.dom(ariaLabelElSelector).doesNotHaveAria('labelledby');` when https://github.com/cibernox/ember-power-select/issues/1871 is resolved
        if (
          ['powerSelect', 'powerSelectCheckboxes'].includes(field.fieldType)
        ) {
          assert.dom(ariaLabelElSelector).hasAria('labelledby', '');
        } else {
          assert.dom(ariaLabelElSelector).doesNotHaveAria('labelledby');
        }
      });
  },
  async checkAttrForFieldLabels(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;

      if (
        fieldTypeBreakdown.semanticMarkup &&
        fieldTypeBreakdown.fieldLabelElement === 'label'
      ) {
        assert.dom(fieldTypeBreakdown.selector).hasAttribute('id', field.id);
        assert
          .dom(
            `${fieldSelector} ${fieldTypeBreakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
          )
          .hasAttribute('for', field.id);
      } else {
        assert
          .dom(
            `${fieldSelector} ${fieldTypeBreakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
          )
          .doesNotHaveAttribute('for');
      }
    });
  },
  async checkAttrForRadioAndCheckboxLabels(assert, fields) {
    fields.forEach((field) => {
      const fieldSelector = `[data-test-id="${field.id}"]`;
      if (
        !['radioButtonGroup', 'singleCheckbox', 'checkboxGroup'].includes(
          field.fieldType,
        )
      ) {
        return;
      }
      const els = find(`${fieldSelector} [data-test-labelled-radio-button]`)
        ? findAll(`${fieldSelector} [data-test-labelled-radio-button]`)
        : findAll(`${fieldSelector} [data-test-labelled-checkbox]`);
      els.forEach((el) => {
        const inputId = el.querySelector('input').id;
        assert.dom(el.querySelector('label')).hasAttribute('for', inputId);
      });
    });
  },

  async checkAriaLabelledBy(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(
          `${fieldSelector} ${fieldTypeBreakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
        )
        .hasAttribute('id', `${field.id}-label`);
      if (fieldTypeBreakdown.semanticMarkup) {
        assert.dom(fieldTypeBreakdown.selector).doesNotHaveAria('labelledby');
      } else {
        assert
          .dom(fieldTypeBreakdown.selector)
          .hasAria('labelledby', `${field.id}-label`);
      }
    });
  },

  async checkErrorsPresent(assert, fields) {
    await click(testEls.cwfSubmitFormButton);
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;

      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .hasAttribute('id', `${field.id}-errors`);
      // Role alert ensures screen readers read it out as soon as it changes. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .hasAttribute('role', 'alert');
      assert
        .dom(fieldTypeBreakdown.selector)
        .hasAria('errormessage', `${field.id}-errors`);
    });
  },

  async checkErrorsAbsent(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;

      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .doesNotExist();
      assert.dom(fieldTypeBreakdown.selector).doesNotHaveAria('errormessage');
    });
  },

  async fieldsRequired(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      if (field.fieldType === 'checkboxGroup') {
        return;
      }
      if (fieldTypeBreakdown.semanticMarkup) {
        assert
          .dom(
            fieldTypeBreakdown.requiredElementSelector ||
              fieldTypeBreakdown.selector,
          )
          .doesNotHaveAria('required');
        assert
          .dom(
            fieldTypeBreakdown.requiredElementSelector ||
              fieldTypeBreakdown.selector,
          )
          .hasAttribute('required');
      } else {
        assert
          .dom(
            fieldTypeBreakdown.requiredElementSelector ||
              fieldTypeBreakdown.selector,
          )
          .hasAria('required', '');
        assert
          .dom(
            fieldTypeBreakdown.requiredElementSelector ||
              fieldTypeBreakdown.selector,
          )
          .doesNotHaveAttribute('required');
      }
    });
  },

  async fieldsNotRequired(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      if (field.fieldType === 'checkboxGroup') {
        return;
      }
      assert
        .dom(
          fieldTypeBreakdown.requiredElementSelector ||
            fieldTypeBreakdown.selector,
        )
        .doesNotHaveAttribute('required');
      assert
        .dom(
          fieldTypeBreakdown.requiredElementSelector ||
            fieldTypeBreakdown.selector,
        )
        .doesNotHaveAria('required');
    });
  },

  async checkDescribedByDescriptionPresent(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-description"]`)
        .doesNotExist('id', `${field.id}-description`);
      assert.dom(fieldTypeBreakdown.selector).doesNotHaveAria('describedby');
    });
  },

  async checkDescribedByDescriptionNotPresent(assert, fields) {
    fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-description"]`)
        .hasAttribute('id', `${field.id}-description`);
      assert
        .dom(fieldTypeBreakdown.selector)
        .hasAria('describedby', `${field.id}-description`);
    });
  },
};

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
      fieldLabelElement: 'div',
      fieldType: 'powerSelect',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
    {
      fieldLabelElement: 'div',
      fieldType: 'powerSelectCheckboxes',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
    {
      fieldType: 'powerDatePicker',
      fieldLabelElement: 'div',
      selector: `[data-test-id="${field.id}"] .ember-basic-dropdown-trigger`,
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
    {
      fieldType: 'clone-group',
      fieldLabelElement: 'div ',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
  ];
  return map.find((item) => item.fieldType === field.fieldType);
}
