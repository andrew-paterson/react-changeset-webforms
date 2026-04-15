// BEGIN-SNIPPET component-for-all-checkbox-options.jsx
export default function ComponentForAllCheckboxOptions({ option, props, htmlFor, labelId }) {
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
      &nbsp;This is a custom label component applied to all of the checkbox options
    </label>
  );
}
// END-SNIPPET
