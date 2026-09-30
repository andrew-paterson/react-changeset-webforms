import { useEffect } from 'react';

/**
 * Minimal accessible modal dialog. Closes on Escape or backdrop click.
 */
export default function DocsModalDialog({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="docs-modal-dialog__backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="docs-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="docs-modal-dialog__title">{title}</h2>}
        <div className="docs-modal-dialog__body">{children}</div>
        <button
          type="button"
          className="docs-modal-dialog__close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
