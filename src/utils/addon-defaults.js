import InputComponent from '../components/fields/input.jsx';
import TextareaComponent from '../components/fields/textarea.jsx';
import PowerSelectComponent from '../components/fields/power-select.jsx';
import PowerDatepickerComponent from '../components/fields/power-datepicker.jsx';
import CheckboxComponent from '../components/fields/checkbox.jsx';
import RadioButtonGroupComponent from '../components/fields/radio-button-group.jsx';
import CheckboxGroupComponent from '../components/fields/checkbox-group.jsx';
import ClickerComponent from '../components/fields/clicker.jsx';
import StaticContentComponent from '../components/fields/static-content.jsx';
import PowerSelectCheckboxesComponent from '../components/fields/power-select-checkboxes.jsx';
import IconTrashComponent from '../components/icons/icon-trash.js';
import AddCloneButtonComponent from '../components/cloned-field-elements/add-clone-button.jsx';
import PowerSelectCheckboxesTriggerComponent from '../components/background/power-select-checkboxes-trigger.js';
import moment from 'moment';

export default {
  // BEGIN-SNIPPET default-attrs-from-config.js
  attrsFromConfig: {
    classNames: {
      // Generic element classes
      inputElement: ['input'],
      textareaElement: ['form-control', 'validation-area', '$validationClassNames', '$validationPseudoClasses'],
      labelElement: null,
      checkboxElement: ['form-check-input', '$validationClassNames', '$validationPseudoClasses'],
      radioButtonElement: ['form-check-input', '$validationClassNames', '$validationPseudoClasses'],
      buttonElement: ['btn', 'd-inline-flex'],
      buttonIcon: ['me-2', 'button-icon'],
      // Generic field classes- apply to all fields
      disabledField: ['disabled'],
      focussedField: ['focussed'],
      fieldWrapper: ['cwf-field', 'mb-3'],
      fieldControls: ['field-controls', '$validationClassNames'],
      fieldLabel: ['form-label'],
      fieldDescription: ['cwf-field-description'],
      requiredField: ['required'],
      optionsWrapper: ['cwf-field-options'],
      // Generic validation related classes - apply to all fields
      validClassNames: ['is-valid'],
      invalidClassNames: ['is-invalid'],
      validationErrors: ['cwf-field-errors', 'invalid-feedback', 'form-text'],
      validationError: ['cwf-field-error'],
      fieldValidates: ['validates'],
      validatedField: ['was-validated'],
      // Form wrapper
      formWrapper: ['cwf-form-wrapper'],
      formElement: ['cwf-form', '$validationClassNames'],
      // Form action element element classes
      formFields: ['form-fields'],
      formActions: ['form-actions', 'mt-4'],
      submitButton: ['btn-primary', 'form-submit-button', 'btn-lg'],
      submitButtonIcon: [],
      // Request in flight
      requestInFlightIcon: ['request-in-flight', 'spinner-border', 'spinner-border-sm', 'ms-2'],
      resetFormButtonIcon: [],
      clearFormButtonIcon: [],
      resetFormButton: ['btn-warning', 'btn-lg'],
      clearFormButton: ['btn-dark', 'btn-lg'],
      // fieldType === 'input
      fieldWrapperInput: ['cwf-field-input'],
      inputField: ['form-control', 'validation-area', '$validationClassNames', '$validationPseudoClasses'],
      // fieldType === 'clonable'
      cloneGroupWrapper: ['cwf-clone-group'],
      cloneWrapper: ['cwf-clone', 'mb-3'],
      cloneGroupItems: ['cwf-clone-group-items', '$validationClassNames'],
      cloneFieldControls: ['cwf-clone-field-controls', '$validationClassNames'],
      cloneGroupActions: ['cwf-clone-group-actions', 'margin-y-lg'],
      maxClonesReached: ['cwf-max-clones-reached'],
      addCloneButton: ['btn-outline-secondary'],
      removeCloneButton: ['hover-pointer', 'remove-clone', 'clone-actions', 'width-xl', 'p-2', 'pb-0'],
      addCloneButtonIcon: [],
      removeCloneButtonIcon: ['fill-gray-medium', 'remove-clone-icon'],
      // fieldType === 'powerSelect'
      powerSelectTrigger: ['form-control', '$validationClassNames', 'validation-area'],
      powerSelectDropdown: [],
      // fieldType === 'powerSelectCheckboxes'
      powerSelectCheckboxesTrigger: ['form-control', '$validationClassNames', 'validation-area'],
      // fieldType === powerDatePicker
      powerDatePickerTriggerWrapper: ['form-control', 'input', '$validationClassNames'],
      powerDatePickerTriggerInput: null,
      powerDatePickerDropdown: ['bg-transparent'],
      powerDatePickerDropdownInner: ['bg-white', 'p-2', 'border', 'rounded', 'd-flex', 'flex-column', 'align-items-center'],
      powerDatePickerCalendar: null,
      powerDatePickerTimeSelectorContainer: ['cwf-time-selector', 'mt-2'],
      powerDatePickerTimeSelectorInput: ['inline'],
      powerDatePickerClearButton: ['clear-date-time-button', 'icon'],
      powerDatePickerCalendarIcon: ['calendar-icon', 'icon'],
      powerDatePickerCalendarNav: ['d-flex', 'align-items-center'],
      powerDatePickerCalendarDays: null,
      // fieldType === 'clicker';
      clickerElement: ['cwf-clicker'],
      // fieldType === ('singleCheckBox' || 'checkBoxGroup)
      checkboxLabel: ['form-check-label'],
      labelledCheckbox: ['form-check', 'labelled-checkbox'],
      // fieldType === 'radioButtonGroup
      labelledRadioButton: ['form-check', 'labelled-radio-button'],
      radioButtonLabel: ['form-check-label'],
    },
    attrFunctions: {
      focussedField(element, changesetWebform, formField) {
        const classNameSettings = changesetWebform.formSchemaWithDefaults.classNameSettings;
        if (formField.focussed) {
          element.classList.add(...classNameSettings.focussedField);
        } else {
          element.classList.remove(...classNameSettings.focussedField);
        }
      },
      validatedField(element, changesetWebform, formField) {
        const classNameSettings = changesetWebform.formSchemaWithDefaults.classNameSettings;
        if (formField.showValidation) {
          element.classList.add(...classNameSettings.validatedField);
        } else {
          element.classList.remove(...classNameSettings.validatedField);
        }
      },
      disabledField(element, changesetWebform, formField) {
        const classNameSettings = changesetWebform.formSchemaWithDefaults.classNameSettings;
        if (formField.disabled) {
          element.classList.add(...classNameSettings.disabledField);
        } else {
          element.classList.remove(...classNameSettings.disabledField);
        }
      },
    },
  },
  // END-SNIPPET

  formSettings: {
    // BEGIN-SNIPPET form-settings-options.js
    formName: null, // String. Must be unique. Used as a namespace for things like input ID and 'for' attributes..
    novalidate: true, // Disable the browser's native validation feedback
    hideSubmitButton: false, // Boolean - hides the submit button if true
    submitButtonText: 'Submit', // String - text to show on the submit form button
    requestInFlightIcon: null, // Object with { componentClass, props }.
    // `componentClass` is the imported class of the component to show on the submit form button.
    // `props` can be included to pass state or data to the component, accessible as {{@props}}.
    // `@changesetWebform is passed to the component.
    // Note that if null, an empty element will still appear on the submit button, with the class names defined for requestInFlightIcon. If false, the element will not appear on the submit button.
    addCloneButtonIconComponent: null, // Object with { componentClass, props }.
    // `componentClass` is the imported class of the component to show on the submit form button.
    // `props` can be included to pass state or data to the component, accessible as {{@props}}.
    // `@changesetWebform, and @formField are passed to the component.
    clearFormButton: false, // Boolean - whether or not to show the button that will empty all fields.
    clearFormButtonText: 'Clear form', // String - text to show on the clear form button TODO implement
    resetFormButton: false, // Boolean - if true, a button is shown which call the changeset.rollback() method. See https://github.com/poteto/ember-changeset#rollback
    resetFormButtonText: 'Discard changes',
    submitAfterClear: false, // Boolean. If true submits, the form after the clear form button is clicked. An example use case is a filters form with a clear filters button, where the desired behaviour is to clear the form fields, and then submit the empty form to reset the filters.
    clearFormAfterSubmit: false, // Boolean or string - if true, all fields are reset to their defaults after a the form submitData returns successfully.
    submitButtonType: 'button', // String - the type of the submit button. Can be 'button' or 'submit'.
    attrsFromConfig: {
      classNames: {}, // Object - keys can correspond to those in the classNames settings. See /docs/configure-classnames
    },
    // END-SNIPPET
  },
  fieldSettings: {
    // TODO document that these can all be included in a form in "fieldSettings"
    fieldId: null, // String (required) - the id of the field. If not set, an error will be thrown.
    fieldLabel: null, // String (required) - the label of the field as a whole. If not set, an error will be thrown. Use hidelabel in order to hide the label. Even if the label is hidden, this value is used to populate accesibility attributes, such as aria-label.
    propertyName: null, // Optional, defaults to the value oif fieldId if not set.
    name: null, // String - defaults to the fieldId
    // BEGIN-SNIPPET generic-field-settings.js
    validationRules: [], // Array of objects defining validation rules. See "Validation".
    validatesOn: ['submit', 'pushErrors'], // Array of strings, specifing the names of events which should triggger validation.
    showValidationWhenFocussed: null, // Boolean - unless this is true, validation colours, icons and messages will be omitted for as long as the "focussed" prop of a field is true. The build in input and textarea fields set focussed to true when the user focuesses the element.
    omitted: false, // Boolean - or object - if true, the field is omitted and also ignored when validating or submitting the form. Can also be an object which defines rules for dynamic omission/inclusion. See /docs/hiding-and-showing-fields.
    defaultValue: null, // Any - auto set the changeset property for the field to this value when the ChangesetWebform component is rendered and the changeset is created. This value will be overridden by a corresponding property in the data object that is passed to the ChangesetWebform component.
    labelComponent: null, // Object with { componentClass, props }.
    // If set, fieldLabel becomes null.
    // `componentClass` is the imported class of the component to show inside the field label element.
    // `props` can be included to pass state or data to the component, accessible as {{@props}}.
    // `@changesetWebform, and @formField are passed to the component.
    labelMarkdown: null, // String - a markdown string to render as HTML within the label element.
    hideLabel: null, // Boolean - Hide the label from the user
    disabled: false, // Boolean - disable the field, but do not hide it. It will still be validated [TODO check] and included when the form is submitted
    resetWhenOmitted: true, // Boolean - reset the field value and validation when the field is omitted from the form.
    attrsFromConfig: {
      classNames: {}, // Object - keys can correspond to those in the classNames settings. See /docs/configure-classnames
    },
    cloneActionsPosition: 'fieldActions', // String - where to place the remove clone button in relation to the cloned field. Can be [TODO]
    includeLabelForAttr: false, // Boolean - if true, the label element will have a 'for' attribute that matches the input element's 'id' attribute.
    isFieldset: false, // Boolean - if true, the field options are wrapped in a fieldset element, and the field label is wrapped in a legend element.
    requiresAriaLabelledBy: false, // Boolean - if true, the field will have an aria-labelledby attribute that points to the field label. This is not required if the field uses semantic element/s such as inputs or textareas, and the "for" attribute of the label correctly points to the semantic element/s.

    // END-SNIPPET
    // eventLog: [],
  },
  fieldTypes: [
    {
      // BEGIN-SNIPPET input-field-options.js
      fieldType: 'input',
      inputType: 'text', // String - the html input type
      autofocus: false, // Boolean - whether to autofocus the input on insert
      placeholder: null, // String - placeholder text of the input
      trim: true, // Trim spaces from the beginning and end of the input after focus out. This is never applied to inputs with type password, even if true.
      includeLabelForAttr: true, // Boolean - if true, the label element will have a 'for' attribute that matches the input element's 'id' attribute.
      validatesOn: ['$inherited', 'focusOut'], // Array of strings
      // END-SNIPPET
      componentClass: InputComponent,
    },
    {
      // BEGIN-SNIPPET clone-group-field-options.js
      fieldType: 'clone-group',
      maxClonesReachedText: 'Max clones reached.', // String
      removeCloneComponent: {
        componentClass: IconTrashComponent,
      }, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to show as the remove clone icon.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@changesetWebform, @formField, and @formFieldClone are passed to the component.
      addCloneButtonComponent: {
        componentClass: AddCloneButtonComponent,
      }, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to replace add clone button.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@changesetWebform and @formField are passed to the component.
      minClones: 1, // Number - minimum number of clones allowed.
      maxClones: null, // Number - maximum number of clones allowed.
      cloneButtonText: null, // String - text to show in the add clone button. Defaults to `Add ${clonedField.fieldLabel} field`
      cloneFieldSchema: {}, // Object - the field definition of the clones, defined in the same way that you would define the field as a one off field.
      validatesOn: ['$inherited', 'removeClone'], // Array of strings
      cloneGroupActionsPosition: 'cloneGroupWrapper', // String. Can also be labelWrapper, If cloneGroupWrapper, the clone group action buttons and content will appear below the cloned fields. If `labelWrapper` the the field bale will be wrapper in a div, and the clone group action buttons will be rendered in the label wrapper, after the label element.
      requiresAriaLabelledBy: true,
      // END-SNIPPET
      componentClass: 'ember-changeset-webforms/cloned-form-fields/validating-form-field-clone-group',
    },
    {
      // BEGIN-SNIPPET textarea-field-options.js
      fieldType: 'textarea',
      autofocus: false, // Boolean - whether to autofocus the input on insert
      validatesOn: ['$inherited', 'focusOut'], // Array of strings
      includeLabelForAttr: true, // Boolean - if true, the label element will have a 'for' attribute that matches the input element's 'id' attribute.
      // END-SNIPPET
      componentClass: TextareaComponent,
    },
    {
      // BEGIN-SNIPPET powerSelect-field-options.js
      fieldType: 'powerSelect',
      allowClear: false, // Boolean. If true, the select box shows a clear icon which clears the value oif the field. See https://ember-power-select.com/docs/the-trigger for more.
      searchEnabled: false, // Boolean. If true, a search box will display at the top of the select options, and will filter the options list then the user types. See https://ember-power-select.com/docs/the-search for more.
      searchPlaceholder: 'Search', // String. If passed it will replace the default placeholder in the search box for the power select list.
      options: [], // Array of items to show in the dropdown. Items can either all be objects, or they can all be primitives, such as strings or numbers. If an array of objects is passed, then optionDisplayProp should be passed to determine which property in the object should be shown as the label of the option in the list.
      optionDisplayProp: null, // String - which property of the object to show in the list if options is an array of objects.
      optionComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to show on the add clone button.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@changesetWebform and @formField are passed to the component.
      selectedItemComponent: null, // The imported class of the component to pass to the Power Select component. See https://ember-power-select.com/docs/api-reference
      validatesOn: ['$inherited', 'valueUpdated'], // Array of strings
      requiresAriaLabelledBy: true,
      // END-SNIPPET
      componentClass: PowerSelectComponent,
    },
    {
      // BEGIN-SNIPPET powerDatePicker-field-options.js
      fieldType: 'powerDatePicker',
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss', // String - time format to use
      dateTimeDisplayFormat: null, // String - the format of the datetime to show in the trigger input. Defaults to dateTimeFormat if null.
      defaultTime: '00:00:00.000', // String - default time. Must be in the format HH:mm:ss.SSS.
      fixedTime: null, // String - force the time to a value, whatever tha date is. Must be in the format HH:mm:ss.SSS
      showTimeSelector: false, // Boolean - show the UI for the user to change the time.
      timeSelectorFields: 'HH,mm,ss,SSS', // String - comma separated list of the fields to show in the time selector component. combination of valid momentjs time string parts can be given.
      calendarTitleFormat: 'MMMM YYYY',
      timeInputLabels: {
        hours: 'Hour',
        minutes: 'Min',
        seconds: 'Sec',
        milliseconds: 'Msec',
        amPm: 'AM/PM',
      },
      closeDatePickerOnSelect: false,
      dateRangeSettings: null,
      minDate: null, // String - the earliest day that the calendar will allow the user to select. Must be in the format YYYY-MM-DD.
      maxDate: null, // String - the latest day that the calendar will allow the user to select. Must be in the format YYYY-MM-DD.
      validatesOn: ['$inherited', 'valueUpdated', 'blurDateTimeInput'], // Array of strings
      requiresAriaLabelledBy: true,
      // END-SNIPPET
      componentClass: PowerDatepickerComponent,
      customParser(field) {
        field.dateTimeFormat = field.dateTimeFormat.replace(/S{1,}/, 'SSS');
        field.dateTimeDisplayFormat = field.dateTimeDisplayFormat ? field.dateTimeDisplayFormat.replace(/S{1,}/, 'SSS') : field.dateTimeFormat;

        if (field.defaultValue) {
          field.defaultValue = moment(field.defaultValue, field.dateTimeFormat).format(field.dateTimeFormat);
        }
        return field;
      },
    },
    {
      // BEGIN-SNIPPET singleCheckbox-field-options.js
      fieldType: 'singleCheckbox',
      checkBoxLabelComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to replace the checkbox label.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@option`, `@for`, `@labelId`, `@checked`, `@changesetWebform`, and `@formField` are also passed to the component.
      // Set `for={{@for}}` and `id={{@labelId}} on the label element in the component to ensure accessibility.
      checkboxLabelMarkdown: null, // Markdown string - a markdown string to render as HTML TODO doc what addon is needed to use this and add to all the other labels.
      validatesOn: ['$inherited', 'checkboxToggled'], // Array of strings
      // END-SNIPPET
      componentClass: CheckboxComponent,
    },
    {
      // BEGIN-SNIPPET radioButtonGroup-field-options.js
      fieldType: 'radioButtonGroup',
      options: [], // Array of objects, see /docs/radio-button-group#radio-button-group-options-prop
      optionLabelComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to replace the label element for each option.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@option`, `@for`, `@labelId`, `@checked`, `@changesetWebform`, and `@formField` are also passed to the component.
      // Set `for={{@for}}` and `id={{@labelId}} on the label element in the component to ensure accessibility.
      validatesOn: ['$inherited', 'radioOptionChanged'], // Array of strings
      isFieldset: true, // Wrap field options in a fieldset element and field label in a legend element.
      // END-SNIPPET
      componentClass: RadioButtonGroupComponent,
    },
    {
      // BEGIN-SNIPPET checkboxGroup-field-options.js
      fieldType: 'checkboxGroup',
      options: [], // Array of objects, docs/checkbox-group#checkbox-group-options.
      optionLabelComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to replace the label element for each option.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@option`, `@for`, `@labelId`, `@checked`, `@changesetWebform`, and `@formField` are also passed to the component.
      // Set `for={{@for}}` and `id={{@labelId}} on the label element in the component to ensure accessibility.
      validatesOn: ['$inherited', 'checkboxToggled'], // Array of strings
      isFieldset: true, // Wrap field options in a fieldset element and field label in a legend element.
      // END-SNIPPET
      componentClass: CheckboxGroupComponent,
    },
    {
      // BEGIN-SNIPPET clicker-field-options.js
      fieldType: 'clicker',
      clickerText: null, // String - text to display in the clicker element.
      displayComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to show on the add clone button.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@onClick`, @changesetWebform and @formField are passed to the component.
      // Add `{{on "click" @onClick}} to the element in the component to ensure the clicker works.
      // END-SNIPPET
      componentClass: ClickerComponent,
      ignoreValidation: true,
    },
    {
      // BEGIN-SNIPPET staticContent-field-options.js
      fieldType: 'staticContent',
      text: null,
      textElement: 'h3 ', // TODO check this
      contentComponent: null, // Object with { componentClass, props }.
      // `componentClass` is the imported class of the component to show on the add clone button.
      // `props` can be included to pass state or data to the component, accessible as {{@props}}.
      // `@changesetWebform and @formField are passed to the component.
      // END-SNIPPET
      componentClass: StaticContentComponent,
      ignoreValidation: true,
    },
    {
      // BEGIN-SNIPPET powerSelectCheckboxes-field-options.js
      fieldType: 'powerSelectCheckboxes',
      allowClear: false, // Boolean. If true, the select box shows a clear icon which clears the value oif the field. See https://ember-power-select.com/docs/the-trigger for more.
      searchEnabled: false, // Boolean. If true, a search box will display at the top of the select options, and will filter the options list then the user types. See https://ember-power-select.com/docs/the-search for more.
      searchPlaceholder: 'Search', // String. If passed it will replace the default placeholder in the search box for the power select list.
      options: [], // Array of items to show in the dropdown. Items can either all be objects, or they can all be primitives, such as strings or numbers. If an array of objects is passed, then optionDisplayProp should be passed to determine which property in the object should be shown as the label of the option in the list.
      optionDisplayProp: null, // String - which property of the object to show in the list if options is an array of objects.
      validatesOn: ['$inherited', 'valueUpdated'], // Array of strings
      triggerComponent: PowerSelectCheckboxesTriggerComponent, // Optional -  imported class of the component pass to the Power Select compoent as `triggerComponent`.
      // `@extra` is passed to the component from the Power Select component
      requiresAriaLabelledBy: true,
      displaySelectedFirst: true, // Boolean - if true, when the dropdown is opened, selected options are displayed the top of the options list by adding display:flex and flex-direction column as inline styles to the options container element, and order:-1 as an inline style opt the list elements of selected options. The options property of the field is not mutated in any way.
      // END-SNIPPET
      componentClass: PowerSelectCheckboxesComponent,
    },
  ],
};
// END-SNIPPET
