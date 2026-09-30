/**
 * Generic router-agnostic link. Pass your own `linkComponent` (e.g.
 * react-router-dom's Link, or Next.js's Link) to integrate with any router;
 * defaults to a plain <a> so this works with zero router dependency.
 */
export default function DocsLink({
  to,
  linkComponent: LinkComponent,
  children,
  ...rest
}) {
  if (LinkComponent) {
    return (
      <LinkComponent to={to} {...rest}>
        {children}
      </LinkComponent>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
