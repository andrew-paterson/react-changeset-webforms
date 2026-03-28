// BEGIN-SNIPPET custom-clicker-component.jsx
import IconArrowUp from '../svg/icons/IconArrowUp.jsx';
import IconArrowDown from '../svg/icons/IconArrowDown.jsx';

export default function CustomClickerComponent({ formField, props, onClick }) {
  const Icon = formField.customProps.showAdvanced ? IconArrowUp : IconArrowDown;
  return (
    <button
      data-test-class="cwf-clicker-element"
      type="button"
      onClick={onClick}
      className={`btn-${props.buttonType} d-flex`}
    >
      {formField.clickerText}
      <Icon className="width-lg ms-2" />
    </button>
  );
}
// END-SNIPPET
