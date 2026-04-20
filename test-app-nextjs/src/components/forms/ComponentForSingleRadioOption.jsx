'use client';

// BEGIN-SNIPPET component-for-single-radio-option.jsx
import React from 'react';

export default function ComponentForSingleRadioOption({ option, props, htmlFor, labelId }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="inline-flex flex-align-center">
      <label
        id={labelId}
        htmlFor={htmlFor}
      >
        <b>{option.label}</b> This is a custom component for the label of one specific radio option
      </label>
      <button
        className="btn btn-primary btn-sm ms-2"
        type="button"
        data-test-id="more-info-toggler"
        onClick={() => setOpen((o) => !o)}
      >
        More info
      </button>
      {open && <div className="rounded p-2 border border-primary box-arrow card-box-shadow">{props.info}</div>}
    </div>
  );
}
// END-SNIPPET
