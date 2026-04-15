import { forwardRef, useRef } from 'react';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import useMergedRef from '../../hooks/use-merged-ref.js';

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
 *
 * The forwarded ref is applied to whichever element is rendered.
 */
function getLabelType(formField) {
  if (formField?.requiresAriaLabelledBy) return 'div';
  if (formField?.isFieldset) return 'legend';
  return 'label';
}

const FieldLabelWrapper = forwardRef(function FieldLabelWrapper({ formField, changesetWebform, children, ...rest }, ref) {
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
        ref={useMergedRef(ref, legendRef)}
        {...filterHtmlProps(rest)}
      >
        {children}
      </legend>
    );
  }

  if (labelType === 'div') {
    return (
      <div
        ref={useMergedRef(ref, divLabelRef)}
        {...filterHtmlProps(rest)}
      >
        {children}
      </div>
    );
  }

  // default: <label> with htmlFor
  return (
    <label
      ref={useMergedRef(ref, labelRef)}
      htmlFor={formField?.id}
      {...filterHtmlProps(rest)}
    >
      {children}
    </label>
  );
});

export default FieldLabelWrapper;
