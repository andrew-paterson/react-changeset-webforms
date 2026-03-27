import filterHtmlProps from '../../../../utils/filter-html-props.js';

export default function RequestInFlightIcon({ children, ...rest }) {
  return <div {...filterHtmlProps(rest)}></div>;
}
