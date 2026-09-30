/**
 * Landing-page hero banner: title + subtitle + optional call-to-action
 * children (buttons/links).
 */
export default function DocsHero({ title, subtitle, children, className = '' }) {
  return (
    <div className={`docs-hero ${className}`}>
      {title && <h1 className="docs-hero__title">{title}</h1>}
      {subtitle && <p className="docs-hero__subtitle">{subtitle}</p>}
      {children && <div className="docs-hero__actions">{children}</div>}
    </div>
  );
}
