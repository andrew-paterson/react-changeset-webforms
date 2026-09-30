import DocsNavList from './DocsNavList.jsx';

/**
 * Full sidebar nav, driven entirely by data — no hand-written link markup
 * required per page. `sections` shape:
 *   [{ title: 'Introduction', items: [{ to, label }, ...] }, ...]
 */
export default function DocsNav({
  sections = [],
  currentPath,
  linkComponent,
  isOpen,
  className = '',
}) {
  return (
    <div className={`docs-nav${isOpen ? ' show-mobile' : ''} ${className}`}>
      <nav className="docs-nav__inner">
        <ul>
          {sections.map((section) => (
            <DocsNavList
              key={section.title}
              title={section.title}
              items={section.items}
              currentPath={currentPath}
              linkComponent={linkComponent}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
