import { useDocsSectionHeadings } from './DocsSection.jsx';
import useActiveHeading from '../hooks/useActiveHeading.js';

/**
 * Auto-generated "On This Page" sub-nav. Reads headings from the nearest
 * ancestor <DocsSection>, so no manual list of links is required — just
 * give your h2/h3 elements an `id` and they'll show up here automatically.
 */
export default function OnThisPage({ title = 'On This Page', className = '' }) {
  const headings = useDocsSectionHeadings();
  const activeId = useActiveHeading(headings);

  if (!headings.length) return null;

  return (
    <nav
      className={`docs-on-this-page ${className}`}
      data-test-current-page-index
    >
      <div className="docs-on-this-page__sticky">
        <ul className="docs-on-this-page__list">
          <li className="docs-on-this-page__title">{title}</li>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`docs-on-this-page__item docs-on-this-page__item--level-${heading.level}${heading.id === activeId ? ' is-active' : ''}`}
              data-test-index-item
            >
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
