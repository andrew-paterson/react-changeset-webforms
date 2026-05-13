import { useEffect } from 'react';
import {
  classNamesFromConfig,
  mergedAttrFunctions,
  setCustomValidity,
} from 'validated-changeset-webforms';

/**
 * useAttrsFromConfig
 *
 * React equivalent of the `attrs-from-config` Ember modifier. Applies
 * config-driven class names, custom validity, and attr functions to a DOM
 * element after it mounts and whenever its dependencies change.
 *
 * @param {React.RefObject} ref             - Ref attached to the target element.
 * @param {string}          names           - Comma-separated element type name(s),
 *                                            e.g. "legendElement" or "fieldWrapper,validatingField".
 * @param {object}          changesetWebform - The webform instance.
 * @param {object}          formField        - The field model.
 */
export default function useAttrsFromConfig(
  ref,
  names,
  changesetWebform,
  formField,
) {
  // Scalar values derived from formField that change when field data updates.
  // Because formField is a class instance, React's reference-equality check on
  // the dependency array won't detect mutations to its properties — so we pull
  // out the primitive values that are most likely to drive config-driven class
  // and attr changes, ensuring the effect re-runs when they change.
  const fieldValue = formField?.fieldValue;
  const validationStatus = formField?.validationStatus;
  const requestInFlight = changesetWebform?.formSettings?.requestInFlight;
  const wasValidated = formField?.wasValidated;
  const disabled = formField?.disabled;
  const focussed = formField?.focussed;
  const eventLogLength = formField?.eventLog?.length;

  useEffect(() => {
    const element = ref.current;
    if (!element || !changesetWebform) return;

    if (
      setCustomValidity(names, changesetWebform, formField) &&
      element.setCustomValidity
    ) {
      element.setAttribute('data-set-custom-validity', true);
    }

    const classNames = classNamesFromConfig(
      names,
      changesetWebform,
      formField,
      element,
    );
    element.classList.remove(
      ...classNames.filter((c) => c.startsWith('!')).map((c) => c.slice(1)),
    );
    element.classList.add(...classNames.filter((c) => !c.startsWith('!')));

    names.split(',').forEach((elementType) => {
      const attrFunctions = mergedAttrFunctions(
        elementType,
        changesetWebform,
        formField,
      );
      if (typeof attrFunctions[elementType] === 'function') {
        attrFunctions[elementType](element, changesetWebform, formField);
      }
    });
  }, [
    ref,
    names,
    changesetWebform,
    requestInFlight,
    formField,
    fieldValue,
    validationStatus,
    wasValidated,
    disabled,
    focussed,
    eventLogLength,
  ]);
}
