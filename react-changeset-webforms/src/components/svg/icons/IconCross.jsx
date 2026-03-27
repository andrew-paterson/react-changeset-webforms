import filterHtmlProps from '../../../utils/filter-html-props.js';

export default function IconCross({ children, ...rest }) {
  return <div {...filterHtmlProps(rest)}>{children}</div>;
}
