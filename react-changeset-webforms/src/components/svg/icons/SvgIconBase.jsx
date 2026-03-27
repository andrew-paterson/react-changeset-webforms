import filterHtmlProps from '../../../utils/filter-html-props.js';

export default function SvgIconBase({ vectorEffect, children, ...rest }) {
  const computedVectorEffect = vectorEffect || 'non-scaling-stroke';

  return (
    <svg
      vectorEffect={computedVectorEffect}
      {...filterHtmlProps(rest)}
    >
      {children}
    </svg>
  );
}
