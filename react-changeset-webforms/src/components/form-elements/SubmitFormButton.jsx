import React, { useRef } from 'react';
import useAttrsFromConfig from '../../hooks/use-attrs-from-config.js';
import filterHtmlProps from '../../utils/filter-html-props.js';

/**
 * SubmitFormButton
 *
 * Renders the primary form submit button. Calls `onFormSubmit(changesetWebform)`
 * on click.
 *
 * Supports three optional icon slots driven by formSettings:
 *  - `submitButtonIcon`      — always shown before the button text.
 *  - `requestInFlightIcon`   — shown only while `changesetWebform.formSettings.requestInFlight`
 *                              is truthy (i.e. a request is in-flight).
 *
 * Props:
 *  - onFormSubmit      {Function}  Handler — called with `changesetWebform`.
 *  - changesetWebform  {object}    Parent webform instance.
 *  - formSettings      {object}    Form-level settings object.
 *  - ...rest                       Spread onto the <button> element.
 */
export default function SubmitFormButton({ onFormSubmit, changesetWebform, formSettings, ...rest }) {
  const SubmitIconComponent = formSettings?.submitButtonIcon?.componentClass;
  const InFlightIconComponent = formSettings?.requestInFlightIcon?.componentClass;
  const requestInFlight = changesetWebform?.formSettings?.requestInFlight;

  const buttonRef = useRef(null);
  const submitIconRef = useRef(null);
  const inFlightIconRef = useRef(null);

  useAttrsFromConfig(buttonRef, 'buttonElement,submitButton', changesetWebform);
  useAttrsFromConfig(submitIconRef, 'buttonIcon,submitButtonIcon', changesetWebform);
  useAttrsFromConfig(inFlightIconRef, 'requestInFlightIcon', changesetWebform);

  return (
    <button
      ref={buttonRef}
      type={formSettings?.submitButtonType}
      data-test-id="cwf-submit-form-button"
      disabled={formSettings?.submitDisabled}
      onClick={() => onFormSubmit?.(changesetWebform)}
      {...filterHtmlProps(rest)}
    >
      {SubmitIconComponent && (
        <span ref={submitIconRef}>
          <SubmitIconComponent
            props={formSettings.submitButtonIcon.props}
            changesetWebform={changesetWebform}
          />
        </span>
      )}
      {formSettings?.submitButtonText}
      {requestInFlight && InFlightIconComponent && (
        <span ref={inFlightIconRef}>
          <InFlightIconComponent
            props={formSettings.requestInFlightIcon.props}
            changesetWebform={changesetWebform}
          />
        </span>
      )}
    </button>
  );
}
