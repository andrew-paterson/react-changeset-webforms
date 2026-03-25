import React from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';

/**
 * FieldLabelWrapper
 *
 * Renders the appropriate label wrapper element based on the field type:
 *  - "legend"  → <fieldset> fields (isFieldset)
 *  - "div"     → fields that need aria-labelledby (requiresAriaLabelledBy)
 *  - "label"   → all other fields (default, with a `for` attribute)
 *
 * Props:
 *  - formField   {object}        The field model object.
 *  - children    {React.Node}    Label content.
 *  - ...rest                     Spread onto the wrapper element.
 */
function getLabelType(formField) {
  if (formField?.requiresAriaLabelledBy) return 'div';
  if (formField?.isFieldset) return 'legend';
  return 'label';
}

export default function FieldLabelWrapper({ formField, children, ...rest }) {
  const labelType = getLabelType(formField);

  if (labelType === 'legend') {
    return <legend {...rest}>{children}</legend>;
  }

  if (labelType === 'div') {
    return <div {...rest}>{children}</div>;
  }

  // default: <label> with htmlFor
  return (
    <label
      htmlFor={formField?.id}
      {...filterHtmlProps(rest)}
    >
      {children}
    </label>
  );
}
