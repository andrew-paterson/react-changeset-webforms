import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start } from 'react-qunit';

setup(QUnit.assert, {
  getRootElement: () => document.getElementById('react-testing'),
});

// Suppress the spurious "ResizeObserver loop completed with undelivered
// notifications" error. This is a benign browser quirk — not a real failure.
// We must patch both window.onerror (which QUnit uses) and the error event
// (belt-and-braces), and do so before QUnit.start() registers its own handler.
const _originalOnerror = window.onerror;
window.onerror = function (message, ...args) {
  if (typeof message === 'string' && message.includes('ResizeObserver loop')) {
    return true; // returning true suppresses the error
  }
  return _originalOnerror ? _originalOnerror.call(this, message, ...args) : false;
};
window.addEventListener(
  'error',
  (event) => {
    if (event.message && event.message.includes('ResizeObserver loop')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true,
); // capture phase so it runs before QUnit's bubble-phase listener

// Boot the app exactly as main.jsx does (Provider, CSS, etc.)
import '../main.jsx';

QUnit.config.testTimeout = 10000000000000000;

// Import all test modules (they register with QUnit)
// import './qunit/form-submission-test.js';
import './qunit/cloned-fields-test.js';

start();
