import DocsLink from './DocsLink.jsx';

/**
 * A single nav entry. `active` lets the consumer flag the current route
 * (e.g. by comparing against router location) without this component
 * needing to know about any particular router.
 */
export default function DocsNavItem({ to, label, active, linkComponent, ...rest }) {
  return (
    <li
      className={`docs-nav-item${active ? ' is-active' : ''}`}
      data-test-id="nav-item"
      data-test-label={label}
    >
      <DocsLink
        to={to}
        linkComponent={linkComponent}
        {...rest}
      >
        {label}
      </DocsLink>
    </li>
  );
}
