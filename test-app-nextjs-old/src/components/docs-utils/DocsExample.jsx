export default function DocsExample({ children, ...rest }) {
  return (
    <div class="docs-p-4" {...rest}>
      {children}
    </div>
  );
}
