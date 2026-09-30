/**
 * Simple top header bar. Pass `logo`/`nav`/`actions` slots as needed —
 * kept deliberately unopinionated about styling.
 */
export default function DocsHeader({ logo, nav, actions, onToggleMenu, className = '' }) {
  return (
    <header className={`docs-header ${className}`}>
      <div className="docs-header__logo">{logo}</div>
      <div className="docs-header__nav">{nav}</div>
      <div className="docs-header__actions">{actions}</div>
      {onToggleMenu && (
        <button
          type="button"
          className="docs-header__menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      )}
    </header>
  );
}
