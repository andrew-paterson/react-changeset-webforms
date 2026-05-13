import PhoneNumberWithCountryCodeComponent from '../components/custom-fields/PhoneNumberWithCountryCode.jsx';

import IconPaperPlane from 'react-changeset-webforms/src/components/svg/icons/app-level/IconPaperPlane.jsx';
import RequestInFlightIcon from 'react-changeset-webforms/src/components/svg/icons/app-level/RequestInFlightIcon.jsx';
// BEGIN-SNIPPET import-default-validators.js
import defaultValidators from 'react-changeset-webforms/src/utils/default-validators.js';

// END-SNIPPET

const config = {
  // BEGIN-SNIPPET app-wide-validators.js
  validators: defaultValidators,
  // END-SNIPPET
  // BEGIN-SNIPPET app-wide-classes.js
  // In services/ember-changeset-webforms.js at changesetWebformsDefaults.attrsFromConfig
  attrsFromConfig: {
    classNames: {
      labelElement: ['$inherited', 'app-wide-label-element-class'],
      powerSelectCheckboxesOption: ['form-check'],
    },
  },
  // END-SNIPPET
  formSettings: {
    submitButtonIcon: { componentClass: IconPaperPlane },
    resetFormButtonIcon: {
      componentClass: IconPaperPlane,
    },
    clearFormButtonIcon: { componentClass: IconPaperPlane },
    addCloneButtonIcon: { componentClass: IconPaperPlane },
    removeCloneButtonIcon: {
      componentClass: IconPaperPlane,
    },
    requestInFlightIcon: {
      componentClass: RequestInFlightIcon,
    },
  },
  // BEGIN-SNIPPET custom-parser-for-all-fields.js
  // In services/ember-changeset-webforms.js at changesetWebformsDefaults.fieldSettings
  fieldSettings: {
    customParser(field) {
      if (field.fieldLabel && typeof field.fieldLabel === 'string') {
        field.fieldLabel = field.fieldLabel.replace(
          'bluthcompany.com',
          'sitwell.com',
        );
        field.placeholder = field.placeholder.replace(
          'bluthcompany.com',
          'sitwell.com',
        );
      }
      return field;
    },
  },
  // BEGIN-SNIPPET app-wide-field-options.js
  // In services/ember-changeset-webforms.js at changesetWebformsDefaults.fieldTypes
  fieldTypes: [
    {
      fieldType: 'radioButtonGroup',
      attrsFromConfig: {
        classNames: {
          fieldLabel: [
            '$inherited',
            'app-wide-radio-button-group-field-label-class',
          ],
          labelElement: [
            '$inherited',
            'app-wide-radio-button-group-label-element-class',
          ],
        },
      },
    },
    // END-SNIPPET
    // BEGIN-SNIPPET custom-field-definition.js
    // In the app defaults
    {
      fieldType: 'phoneNumberWithCountryCode',
      componentClass: PhoneNumberWithCountryCodeComponent,
      validatesOn: ['$inherited', 'focusOutPhoneNumberInput'],
      attrsFromConfig: {
        classNames: {
          fieldControls: [
            '$validationClassNames',
            'form-control',
            'p-0',
            'bg-white',
          ],
          phoneNumberInput: [
            'form-control ',
            'border',
            'border-0',
            'border-start',
            '$validationPseudoClasses',
          ],
          countryCodeTrigger: [
            'input-group-text ',
            'pe-5 ',
            'border ',
            'border-0',
          ],
        },
      },
    },
    // END-SNIPPET
    // BEGIN-SNIPPET custom-parser-in-service.js
    // In the changesetWebformsDefaults object at changesetWebformsDefaults.fieldTypes
    {
      fieldType: 'input',
      customParser(field) {
        if (field.inputType === 'email') {
          field.validationRules = field.validationRules || [];
          const existing = field.validationRules.find(
            (rule) =>
              rule.validationMethod === 'validateFormat' &&
              rule.arguments?.type === 'email',
          );
          if (!existing) {
            field.validationRules.push({
              validationMethod: 'validateFormat',
              arguments: { type: 'email' },
            });
          }
        }
        return field;
      },
    },
    // END-SNIPPET
  ],
};
export default config;
