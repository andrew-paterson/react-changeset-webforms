import React from 'react';

/**
 * ValidatingFieldWrapperElement
 *
 * Renders either a <fieldset> (when formField.isFieldset is true) or a <div>,
 * spreading all extra props onto the chosen element and forwarding children.
 *
 * Props:
 *  - formField   {object}      The field model object.
 *  - children    {React.Node}  Slot content.
 *  - ...rest                   Spread onto the wrapper element.
 */
export default function ValidatingFieldWrapperElement({ formField, children, ...rest }) {
  if (formField?.isFieldset) {
    return (
      <fieldset
        data-options-length={formField.options?.length}
        aria-errormessage={formField.ariaErrorMessage}
        aria-describedby={formField.ariaDescribedBy}
        {...rest}
      >
        {children}
      </fieldset>
    );
  }

  return <div {...rest}>{children}</div>;
}
