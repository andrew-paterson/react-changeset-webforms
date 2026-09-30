/**
 * Logo slot for the docs header. Pass an `src` for an image, or children
 * for an inline SVG/text logo.
 */
export default function DocsLogo({
  src,
  alt = 'Logo',
  href = '/',
  children,
  linkComponent: LinkComponent,
}) {
  const content = src ? (
    <img src={src} alt={alt} className="docs-logo__image" />
  ) : (
    children
  );

  if (LinkComponent) {
    return (
      <LinkComponent to={href} className="docs-logo">
        {content}
      </LinkComponent>
    );
  }

  return (
    <a href={href} className="docs-logo">
      {content}
    </a>
  );
}
