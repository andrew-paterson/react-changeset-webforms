import { useDocsSectionHeadings } from './DocsSection.jsx';
import useActiveHeading from '../hooks/useActiveHeading.js';

/**
 * "On This Page" sub-nav, matching ember-cli-addon-docs' current-page index.
 * Pass `headings` (from `useHeadings`), or omit it to read headings from the
 * nearest ancestor <DocsSection>. Renders nothing when there are no headings.
 */
export default function OnThisPage({
  headings: headingsProp,
  title = 'On This Page',
  className = '',
}) {
  const contextHeadings = useDocsSectionHeadings();
  const headings = headingsProp ?? contextHeadings;
  const activeId = useActiveHeading(headings);

  if (!headings.length) return null;

  return (
    <nav
      className={`AddonDocs-DocsViewer-CurrentPageIndex docs-hidden xl:docs-block docs-flex-no-shrink docs-mr-auto ${className}`}
      data-test-current-page-index
    >
      <div className="docs-sticky docs-top-0 docs-pt-4 docs-pb-8 docs-pr-8 docs-max-h-screen docs-overflow-y-scroll">
        <ul className="docs-border-l docs-border-grey-lighter docs-pl-6 docs-leading-normal">
          <li className="docs-mt-12 docs-text-grey docs-font-bold docs-tracking-wide docs-uppercase docs-text-xxs">
            {title}
          </li>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`docs-leading-tight docs-tracking-tight docs-mt-2 ${heading.level === 3 ? 'docs-ml-4' : 'docs-ml-0'}`}
              data-test-index-item
            >
              <a
                href={`#${heading.id}`}
                className={`docs-no-underline hover:docs-underline docs-text-xxs ${heading.id === activeId ? 'docs-text-brand docs-font-bold' : 'docs-text-grey-dark docs-font-semibold'}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
