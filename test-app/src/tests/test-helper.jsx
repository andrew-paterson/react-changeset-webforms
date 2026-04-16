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
  return _originalOnerror
    ? _originalOnerror.call(this, message, ...args)
    : false;
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

import './qunit/attr-functions-test.js'; // Passing
import './qunit/checkbox-group-test.js'; // Passing with 1 todo
import './qunit/clicker-test.js'; // Passing
import './qunit/cloned-fields-test.js'; // Passing with 1 todo
import './qunit/configure-classnames-test.js'; // Passing
// import './qunit/custom-fields-test.js'; // Needs to select native select
import './qunit/field-methods-test.js'; // Passing
import './qunit/field-omission-test.js'; // Passing
import './qunit/form-methods-test.js'; // Passing
import './qunit/form-submission-test.js'; // Passing
import './qunit/radio-button-group-test.js'; // Passing with whitespace updates
import './qunit/single-checkbox-test.js'; // Passing, but still needs to be written
import './qunit/todo-test.js';
// import './qunit/validation-test.js'; // Needs to ignore old power fields

start();
