import { useCallback, useRef } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

export default function Clicker({ formField, changesetWebform, onUserInteraction, ...rest }) {
  const clickerElement = useRef(null);
  useAttrsFromConfig(clickerElement, 'clickerElement', changesetWebform, formField);
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
        ref={clickerElement}
        {...filterHtmlProps(rest)}
      />
    );
  }

  return (
    <div
      role="button"
      data-test-class="cwf-clicker-element"
      onClick={onClick}
      ref={clickerElement}
      {...filterHtmlProps(rest)}
    >
      {formField.clickerText}
    </div>
  );
}
