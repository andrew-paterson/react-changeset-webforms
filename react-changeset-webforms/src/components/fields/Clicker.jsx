import { useCallback } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';

export default function Clicker({ formField, changesetWebform, onUserInteraction, ...rest }) {
  const onClick = useCallback(
    (event) => {
      onUserInteraction('click', null, event);
    },
    [onUserInteraction],
  );

  if (formField.displayComponent) {
    const DisplayComponent = formField.displayComponent.componentClass;
    return (
      <DisplayComponent
        props={formField.displayComponent.props}
        formField={formField}
        changesetWebform={changesetWebform}
        onClick={onClick}
        {...filterHtmlProps(rest)}
      />
    );
  }

  return (
    <div
      role="button"
      data-test-class="cwf-clicker-element"
      onClick={onClick}
      {...filterHtmlProps(rest)}
    >
      {formField.clickerText}
    </div>
  );
}
