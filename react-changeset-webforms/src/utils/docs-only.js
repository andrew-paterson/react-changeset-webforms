export default {
    radioButtonGroupOption: {
    // BEGIN-SNIPPET radio-button-group-option.js
    value: null, // Will be fieldValue when this option is checked.
    // One of label, optionLabelComponent or optionLabelMarkdown must be passed.
    label: null, // String to display as the label of the option.
    optionLabelComponent: null, // Optional. Component class to replace the standard label element for the option.
    optionLabelMarkdown: null, // Optional. Markdown content that will be rendered as HTML inside the label element for the option.
    // END-SNIPPET
  },

  checkboxGroupOption: {
    // BEGIN-SNIPPET checkbox-group-option.js
    key: null, // If checked, the value of key will be added to the fieldValue array.
    // One of label, optionLabelComponent or optionLabelMarkdown must be passed.
    label: null, // String to display as the label of the option.
    optionLabelComponent: null, // Optional. Component class to replace the standard label element for the option.
    optionLabelMarkdown: null, // Optional. Markdown content that will be rendered as HTML inside the label element for the option.
    // END-SNIPPET
  }
}