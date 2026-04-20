'use client';

// BEGIN-SNIPPET component-for-all-radio-options.jsx
export default function ComponentForAllRadioOptions({ option, props, htmlFor, labelId }) {
  return (
    <label
      htmlFor={htmlFor}
      id={labelId}
    >
      <b>
        <a
          href={props.infoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {option.label}
        </a>
      </b>
      This is a custom label component applied to all of the radio options
    </label>
  );
}
// END-SNIPPET
