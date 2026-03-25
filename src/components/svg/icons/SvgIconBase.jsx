export default function SvgIconBase({ vectorEffect, children, ...rest }) {
  const computedVectorEffect = vectorEffect || 'non-scaling-stroke';

  return (
    <svg
      vectorEffect={computedVectorEffect}
      {...rest}
    >
      {children}
    </svg>
  );
}
