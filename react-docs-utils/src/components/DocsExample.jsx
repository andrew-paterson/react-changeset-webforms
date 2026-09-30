export default function DocsExample({ children, className = '', ...rest }) {
  return (
    <div className={`docs-example ${className}`} {...rest}>
      {children}
    </div>
  );
}
