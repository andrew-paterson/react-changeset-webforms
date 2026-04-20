'use client';

// BEGIN-SNIPPET custom-clicker-component.jsx
import IconArrowUp from '../svg/icons/IconArrowUp.jsx';
import IconArrowDown from '../svg/icons/IconArrowDown.jsx';
import filterHtmlProps from 'react-changeset-webforms/src/utils/filter-html-props.js';

export default function CustomClickerComponent({ formField, props, onClick, ...rest }) {
  const Icon = formField.customProps.showAdvanced ? IconArrowUp : IconArrowDown;
  return (
    <button
      data-test-class="cwf-clicker-element"
      type="button"
      onClick={onClick}
      className={`btn-${props.buttonType} d-flex`}
      {...filterHtmlProps(rest)}
    >
      {formField.clickerText}
      <Icon className="width-lg ms-2" />
    </button>
  );
}
// END-SNIPPET
