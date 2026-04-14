// BEGIN-SNIPPET validation-test-helpers-defaults.js
// import validationTestHelpersDefaults from 'ember-changeset-webforms/test-support/validation-test-helpers-defaults';
export default {
  validClass: 'is-valid',
  invalidClass: 'is-invalid',
  validBorderColour: 'rgb(25, 135, 84)',
  invalidBorderColour: 'rgb(220, 53, 69)',
  validBackgroundColour: 'rgb(25, 135, 84)',
  invalidBackgroundColour: 'rgb(220, 53, 69)',
  validBackgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`,
  invalidBackgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,
  validationBorderColourElements: ['.form-control', '.form-check-input'],
  validationBackgroundColourElements: ['.form-check-input.was-validated'],
  validationBackgroundImageElements: ['.form-control'],
  elementsWithValidationClass: ['.form-control', '.form-check-input'],
  passedValidationAssertionPrefix: 'Check field passed validation',
  failedvalidationAssertionPrefix: 'Check field failed validation',
};
// END-SNIPPET
