// BEGIN-SNIPPET component-for-single-checkbox-option.jsx
import React from 'react';

export default function ComponentForSingleCheckboxOption({ option, props, htmlFor, labelId }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="inline-flex flex-align-center">
      <label
        id={labelId}
        htmlFor={htmlFor}
      >
        <b>
          <a
            href={props.infoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {option.label}
          </a>
        </b>{' '}
        This is a custom component for the label of one specific option.
      </label>
      <button
        className="btn btn-primary btn-sm ms-2"
        type="button"
        data-test-id="more-info-toggler"
        onClick={() => setOpen((o) => !o)}
      >
        More info
      </button>
      {open && <div className="p-2 rounded border border-primary card-box-shadow">{props.info}</div>}
    </div>
  );
}
// END-SNIPPET
