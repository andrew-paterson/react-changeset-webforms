import { useState } from 'react';
import DocsModalDialog from './DocsModalDialog.jsx';

const DEFAULT_SHORTCUTS = [
  { keys: ['/'], description: 'Focus search' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['Esc'], description: 'Close dialog' },
];

/**
 * Renders a button that opens a modal listing keyboard shortcuts.
 * Pass your own `shortcuts` array of { keys: string[], description }.
 */
export default function DocsKeyboardShortcuts({
  shortcuts = DEFAULT_SHORTCUTS,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="docs-keyboard-shortcuts__trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Show keyboard shortcuts"
      >
        ?
      </button>
      <DocsModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Keyboard shortcuts"
      >
        <ul className="docs-keyboard-shortcuts__list">
          {shortcuts.map((shortcut) => (
            <li key={shortcut.description}>
              <span className="docs-keyboard-shortcuts__keys">
                {shortcut.keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </span>
              <span className="docs-keyboard-shortcuts__description">
                {shortcut.description}
              </span>
            </li>
          ))}
        </ul>
      </DocsModalDialog>
    </>
  );
}
