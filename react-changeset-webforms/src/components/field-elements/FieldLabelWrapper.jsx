import { useRef } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * FieldLabelWrapper
 *
 * Renders the appropriate label wrapper element based on the field type:
 *  - "legend"  → <fieldset> fields (isFieldset)
 *  - "div"     → fields that need aria-labelledby (requiresAriaLabelledBy)
 *  - "label"   → all other fields (default, with a `for` attribute)
 *
 * Props:
 *  - formField         {object}        The field model object.
 *  - changesetWebform  {object}        The webform instance.
 *  - children          {React.Node}    Label content.
 *  - ...rest                           Spread onto the wrapper element.
 */
function getLabelType(formField) {
  if (formField?.requiresAriaLabelledBy) return 'div';
  if (formField?.isFieldset) return 'legend';
  return 'label';
}

export default function FieldLabelWrapper({ formField, changesetWebform, children, ...rest }) {
  const labelType = getLabelType(formField);

  const legendRef = useRef(null);
  const labelRef = useRef(null);
  const divLabelRef = useRef(null);
  useAttrsFromConfig(legendRef, 'legendElement', changesetWebform, formField);
  useAttrsFromConfig(labelRef, 'labelElement', changesetWebform, formField);
  useAttrsFromConfig(divLabelRef, 'divLabel', changesetWebform, formField);

  if (labelType === 'legend') {
    return (
      <legend
        ref={legendRef}
        {...rest}
      >
        {children}
      </legend>
    );
  }

  if (labelType === 'div') {
    return <div {...rest}>{children}</div>;
  }

  // default: <label> with htmlFor
  return (
    <label
      ref={labelRef}
      htmlFor={formField?.id}
      {...filterHtmlProps(rest)}
    >
      {children}
    </label>
  );
}
