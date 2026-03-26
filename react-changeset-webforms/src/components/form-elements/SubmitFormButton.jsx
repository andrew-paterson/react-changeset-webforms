import React from 'react';

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

  return (
    <button
      type={formSettings?.submitButtonType}
      data-test-id="cwf-submit-form-button"
      disabled={formSettings?.submitDisabled}
      onClick={() => onFormSubmit?.(changesetWebform)}
      {...rest}
    >
      {SubmitIconComponent && (
        <SubmitIconComponent
          props={formSettings.submitButtonIcon.props}
          changesetWebform={changesetWebform}
        />
      )}
      {formSettings?.submitButtonText}
      {requestInFlight && InFlightIconComponent && (
        <InFlightIconComponent
          props={formSettings.requestInFlightIcon.props}
          changesetWebform={changesetWebform}
        />
      )}
    </button>
  );
}
