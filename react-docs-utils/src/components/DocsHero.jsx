/**
 * Landing-page hero banner, mirroring ember-cli-addon-docs' <DocsHero>.
 * Pass a router `linkComponent` (e.g. react-router's Link) for client-side
 * navigation; it receives `to`. The default plain anchor receives `href`.
 */
export default function DocsHero({
  prefix,
  heading,
  byline,
  docsPath = '/docs',
  linkComponent: LinkComponent = 'a',
  children,
  className = '',
}) {
  const linkProps =
    LinkComponent === 'a' ? { href: docsPath } : { to: docsPath };

  return (
    <div
      className={`docs-bg-brand docs-text-white docs-px-4 docs-py-16 docs-text-center ${className}`}
    >
      <div className="docs-max-w-sm docs-mx-auto">
        <h1 className="docs-font-title docs-font-normal docs-text-jumbo-1 md:docs-text-jumbo-2 xl:docs-text-jumbo-3 docs-leading-none docs-tracking-tight">
          {prefix && (
            <span className="docs-block docs-text-large-5 md:docs-text-large-6 xl:docs-text-large-7">
              {prefix}
            </span>
          )}
          {heading}
        </h1>

        <p className="docs-mt-4 xl:docs-mt-6 docs-mb-2 docs-leading-small docs-mx-auto docs-tracking-tight docs-text-large-1 md:docs-text-large-2 xl:docs-text-large-3">
          {byline}
        </p>

        <div className="docs-mt-8">
          <LinkComponent
            {...linkProps}
            className="docs-no-underline docs-bg-white docs-text-brand docs-text-xs docs-px-3 docs-py-2 docs-rounded docs-mt-4 docs-shadow-md hover:docs-shadow-lg docs-transition hover:docs-nudge-t docs-font-bold docs-inline-block docs-uppercase"
          >
            Read the docs
          </LinkComponent>
        </div>

        {children}
      </div>
    </div>
  );
}
