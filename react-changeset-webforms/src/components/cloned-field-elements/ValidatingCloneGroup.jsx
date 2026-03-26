import React, { useCallback, useRef, useEffect, useState } from 'react';
import FieldLabel from '../field-elements/FieldLabel.jsx';
import FieldErrors from '../field-elements/FieldErrors.jsx';
import ValidatingClone from './ValidatingClone.jsx';
import './validating-clone-group.css';

/**
 * ValidatingCloneGroup
 *
 * Orchestrates a group of cloned fields (repeatable field rows).
 * Mirrors the Ember ValidatingCloneGroup component, including:
 *
 *  - On mount: creates clones from existing data values (fromData: true) and
 *    fills up to `masterFormField.minClones` with empty clones.
 *  - Manages clone add / remove via `masterFormField.cloneField` /
 *    `masterFormField.removeClone`.
 *  - Renders label above the clone list (inline, or inside a label-wrapper div
 *    when `masterFormField.cloneGroupActionsPosition === 'labelWrapper'`).
 *  - Renders the clone-group actions (add-clone button or max-reached message)
 *    either inline or, when `cloneGroupActionsPosition` is 'labelWrapper' or
 *    'preClones', into the corresponding named slot div.
 *
 * Props:
 *  - masterFormField         {object}    The master (parent) field model.
 *  - changesetWebform        {object}    Parent webform instance.
 *  - onUserInteraction       {Function}  Propagated to each ValidatingClone.
 *  - updateFieldValue        {Function}  Propagated to each ValidatingClone.
 *  - validateField           {Function}  Propagated to each ValidatingClone.
 *  - afterClickAddCloneButton {Function} Called after a clone is added.
 *  - dataTestFieldId         {string}    data-test-id on the root div.
 *  - groupValue              {any[]}     Current value array for the group.
 *  - ...rest                             Spread onto the root div.
 */
export default function ValidatingCloneGroup({ masterFormField, changesetWebform, onUserInteraction, updateFieldValue, validateField, afterClickAddCloneButton, dataTestFieldId, groupValue, ...rest }) {
  // Refs for named destination slots (mirrors @tracked destinationElement)
  const cloneGroupWrapperRef = useRef(null);
  const preClonesRef = useRef(null);
  const labelWrapperRef = useRef(null);

  // Force re-render when clones change (masterFormField.clonedFields is mutated)
  const [, forceUpdate] = useState(0);
  const rerender = useCallback(() => forceUpdate((n) => n + 1), []);

  const cloneGroupActionsPosition = masterFormField?.cloneGroupActionsPosition;

  // On mount: seed clones from existing data, then fill up to minClones
  useEffect(() => {
    if (!masterFormField) return;
    const existingValues = masterFormField.fieldValue || [];
    existingValues.forEach(() => {
      masterFormField.cloneField({ fromData: true });
    });
    const emptyCount = (masterFormField.minClones || 0) - existingValues.length;
    for (let i = 0; i < emptyCount; i++) {
      masterFormField.cloneField();
    }
    rerender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cloneField = useCallback(
    (opts = {}) => {
      masterFormField?.cloneField(opts);
      rerender();
    },
    [masterFormField, rerender],
  );

  const removeClone = useCallback(
    (clone) => {
      masterFormField?.removeClone(clone);
      onUserInteraction?.('removeClone');
      rerender();
    },
    [masterFormField, onUserInteraction, rerender],
  );

  const onClickAddCloneButton = useCallback(() => {
    cloneField();
    onUserInteraction?.('addClone');
    afterClickAddCloneButton?.();
  }, [cloneField, onUserInteraction, afterClickAddCloneButton]);

  // Dynamic class namespaces (mirrors get dynamicClassNameNameSpaces)
  const dynamicClasses = ['cwf-clone-group'];
  if (masterFormField?.validates) dynamicClasses.push('fieldValidates');
  if (masterFormField?.required) dynamicClasses.push('requiredField');

  const clones = masterFormField?.clonedFields || [];

  // Clone-group actions: add-clone button or max-clones message
  const AddCloneButtonComponent = masterFormField?.addCloneButtonComponent?.componentClass;

  const cloneGroupActions = (
    <div data-test-id="cwf-clone-group-actions">
      {masterFormField?.cloneCountStatus === 'max' ? (
        <div data-test-id="cwf-max-clones-reached">{masterFormField?.maxClonesReachedText}</div>
      ) : (
        AddCloneButtonComponent && (
          <AddCloneButtonComponent
            props={masterFormField?.addCloneButtonComponent?.props}
            onClickAddCloneButton={onClickAddCloneButton}
            formField={masterFormField}
            changesetWebform={changesetWebform}
          />
        )
      )}
    </div>
  );

  // Decide where to render the actions — inline unless a named slot is set
  const actionsInline = !cloneGroupActionsPosition || (cloneGroupActionsPosition !== 'labelWrapper' && cloneGroupActionsPosition !== 'preClones');

  return (
    <div
      data-test-id={dataTestFieldId}
      data-test-cwf-field-validates={masterFormField?.validates}
      data-test-cwf-field-required={masterFormField?.required}
      data-test-class={`cwf-field-type-${masterFormField?.fieldType}`}
      className={[masterFormField?.typeClass, ...dynamicClasses].filter(Boolean).join(' ')}
      ref={cloneGroupWrapperRef}
      {...rest}
    >
      {/* Label — with optional labWrapper slot for actions */}
      {cloneGroupActionsPosition === 'labelWrapper' ? (
        <div
          ref={labelWrapperRef}
          data-test-class="cwf-field-label-wrapper"
        >
          <FieldLabel
            formField={masterFormField}
            changesetWebform={changesetWebform}
          />
          {/* Actions rendered into labelWrapper slot */}
          {cloneGroupActions}
        </div>
      ) : (
        <FieldLabel
          formField={masterFormField}
          changesetWebform={changesetWebform}
        />
      )}

      {/* Pre-clones slot — actions rendered here when position === 'preClones' */}
      <div
        data-clone-group-pre-clones
        ref={preClonesRef}
      >
        {cloneGroupActionsPosition === 'preClones' && cloneGroupActions}
      </div>

      {/* Clone rows */}
      <div data-test-id="cwf-clone-group-items">
        {clones.map((clonedFormField) => (
          <ValidatingClone
            key={clonedFormField.id ?? clonedFormField.cloneId}
            clonedFormField={clonedFormField}
            masterFormField={masterFormField}
            changesetWebform={changesetWebform}
            cloneField={cloneField}
            removeClone={removeClone}
            onUserInteraction={onUserInteraction}
            updateFieldValue={updateFieldValue}
            validateField={validateField}
            groupValue={groupValue}
          />
        ))}
      </div>

      {/* Master-level validation errors (not clone-level) */}
      <FieldErrors
        formField={masterFormField}
        validationErrorsArray={masterFormField?.masterFormFieldValidationErrors}
        changesetWebform={changesetWebform}
      />

      {/* Inline actions fallback (no named slot) */}
      {actionsInline && cloneGroupActions}
    </div>
  );
}
