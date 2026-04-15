import { useRef } from 'react';
import FieldLabelWrapper from './FieldLabelWrapper.jsx';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';

/**
 * FieldLabel
 *
 * Renders the field label inside a FieldLabelWrapper unless the label should
 * be suppressed (hideLabel, or no label content provided).
 *
 * Supports three label content modes, checked in priority order:
 *  1. `formField.labelComponent` — a custom React component.
 *  2. `formField.labelMarkdown`  — raw markdown string (rendered as plain text
 *     here; swap for a markdown renderer if available).
 *  3. `formField.fieldLabel`     — plain string label.
 *
 * Props:
 *  - formField         {object}  The field model object.
 *  - changesetWebform  {object}  The parent webform instance.
 *  - labelId           {string}  id applied to the wrapper element.
 */
function getNoLabel(formField) {
  if (!formField) return true;
  if (formField.hideLabel) return true;
  if (!formField.fieldLabel && !formField.labelComponent && !formField.labelMarkdown) {
    return true;
  }
  return false;
}

export default function FieldLabel({ formField, changesetWebform, labelId }) {
  const fieldLabelRef = useRef(null);

  useAttrsFromConfig(fieldLabelRef, 'fieldLabel', changesetWebform, formField);

  if (getNoLabel(formField)) {
    return null;
  }

  let labelContent;

  if (formField.labelComponent) {
    const LabelComponent = formField.labelComponent.componentClass;
    labelContent = (
      <LabelComponent
        props={formField.labelComponent.componentClass}
        changesetWebform={changesetWebform}
        formField={formField}
      />
    );
  } else if (formField.labelMarkdown) {
    // Render as plain text; replace with a markdown component if available.
    labelContent = formField.labelMarkdown;
  } else {
    labelContent = formField.fieldLabel;
  }
  return (
    <FieldLabelWrapper
      id={labelId}
      data-test-class="cwf-field-label"
      data-test-id={`${formField.id}-label`}
      formField={formField}
      changesetWebform={changesetWebform}
      ref={fieldLabelRef}
    >
      {labelContent}
    </FieldLabelWrapper>
  );
}
