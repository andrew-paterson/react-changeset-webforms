import DocsNavItem from './DocsNavItem.jsx';

/**
 * Renders one labelled group of nav items, e.g.
 *   <DocsNavList
 *     title="Validation"
 *     items={[{ to: '/docs/field-validation', label: 'Field validation' }]}
 *     currentPath={location.pathname}
 *     linkComponent={Link}
 *   />
 */
export default function DocsNavList({ title, items = [], currentPath, linkComponent }) {
  return (
    <>
      <li className="docs-nav-list__title">{title}</li>
      {items.map((item) => (
        <DocsNavItem
          key={item.to}
          to={item.to}
          label={item.label}
          active={currentPath === item.to}
          linkComponent={linkComponent}
        />
      ))}
    </>
  );
}
