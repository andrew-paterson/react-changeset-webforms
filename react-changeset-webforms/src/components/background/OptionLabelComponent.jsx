import React, { forwardRef, useRef } from 'react';
import MarkdownToHtml from './MarkdownToHtml.jsx';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import filterHtmlProps from '../../utils/filter-html-props.js';
import useMergedRef from '../../hooks/use-merged-ref.js';

/**
 * OptionLabelComponent
 *
 * Renders a label for a checkbox or radio option using one of three strategies
 * (checked in priority order):
 *  1. Custom `optionLabelComponent` — a user-supplied React component.
 *  2. `optionLabelMarkdown` — markdown string rendered via MarkdownToHtml.
 *  3. `label` — plain string label.
 *
 * Props:
 *  - optionLabelComponent  {object}    { componentClass, props } custom label component.
 *  - option                {object}    The option object.
 *  - optionLabelMarkdown   {string}    Markdown string for the label.
 *  - label                 {string}    Plain-text label fallback.
 *  - for                   {string}    htmlFor value on the <label>.
 *  - labelId               {string}    id on the <label>.
 *  - checked               {boolean}   Whether the option is currently selected.
 *  - changesetWebform      {object}    Parent webform instance.
 *  - formField             {object}    The field model object.
 *  - ...rest                           Spread onto the rendered element.
 */
export default forwardRef(function OptionLabelComponent({ optionLabelComponent, option, optionLabelMarkdown, label, for: htmlFor, labelId, checked, changesetWebform, formField, ...rest }, ref) {
  const labelElement = useRef(null);
  const mergedRef = useMergedRef(ref, labelElement);
  useAttrsFromConfig(labelElement, 'labelElement', changesetWebform, formField);

  if (optionLabelComponent) {
    const CustomLabel = optionLabelComponent.componentClass;
    return (
      <CustomLabel
        props={optionLabelComponent.props}
        option={option}
        for={htmlFor}
        labelId={labelId}
        checked={checked}
        changesetWebform={changesetWebform}
        formField={formField}
        {...rest}
      />
    );
  }

  if (optionLabelMarkdown) {
    return (
      <label
        htmlFor={htmlFor}
        id={labelId}
        ref={mergedRef}
        {...filterHtmlProps(rest)}
      >
        <MarkdownToHtml source={optionLabelMarkdown} />
      </label>
    );
  }

  if (label) {
    return (
      <label
        htmlFor={htmlFor}
        id={labelId}
        ref={mergedRef}
        {...filterHtmlProps(rest)}
      >
        {label}
      </label>
    );
  }

  return null;
});
