import DocsNav from './DocsNav.jsx';
import OnThisPage from './OnThisPage.jsx';

/**
 * Three-column docs layout: sidebar nav | page content | on-this-page.
 * The middle slot should contain a <DocsSection> so OnThisPage can pick up
 * its headings automatically.
 */
export default function DocsMain({
  navSections,
  currentPath,
  linkComponent,
  isNavOpen,
  children,
}) {
  return (
    <div className="docs-main">
      <DocsNav
        sections={navSections}
        currentPath={currentPath}
        linkComponent={linkComponent}
        isOpen={isNavOpen}
      />
      <div className="docs-main__content">{children}</div>
      <OnThisPage />
    </div>
  );
}
