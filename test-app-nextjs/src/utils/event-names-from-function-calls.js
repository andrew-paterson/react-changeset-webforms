export default {
  checkboxGroup: ['checkboxToggled'],
  singleCheckbox: ['checkboxToggled'],
  input: ['keyUp', 'keyDown', 'focusOut', 'focusIn'],
  powerSelectCheckboxes: ['optionToggled'],
  powerSelect: [
    'optionSelected',
    'keyDownEnterPowerSelectMultiple',
    'keyDownPowerSelect',
  ],
  radioButtonGroup: ['radioOptionChanged'],
  textarea: ['keyUp', 'keyDown', 'focusOut', 'focusIn'],
  powerDatePicker: [
    'keyUpDateTimeInput',
    'focusDateTimeInput',
    'blurDateTimeInput',
    'clearDateTime',
    'dateSelected',
    'keyDownTimeUnitInput',
    'keyUpTimeUnitInput',
    'focusAmPmInput',
    'keyUpAmPmInput',
  ],
};
