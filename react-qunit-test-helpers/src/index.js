// ---------------------------------------------------------------------------
// DOM interaction helpers (mirrors @ember/test-helpers API)
// ---------------------------------------------------------------------------

import { fireEvent, waitFor as rtlWaitFor } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

/** Flush the microtask queue / React state updates. */
export async function settled() {
  await new Promise((r) => setTimeout(r, 0));
}

/** @deprecated Use settled() directly. Kept for internal use. */
export async function _waitForMs(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

function _getElement(arg) {
  if (typeof arg === 'string') {
    const element = find(arg);
    if (!element)
      throw new Error(`No element with selector "${arg}" was found`);
    return element;
  }
  return arg;
}

function _getElements(arg, indexes) {
  let elements = typeof arg === 'string' ? findAll(arg) : Array.from(arg);
  if (indexes?.length) {
    elements = indexes.map((i) => elements[i]);
  }
  return elements.filter(Boolean);
}

// ---------------------------------------------------------------------------
// DOM Query Helpers
// ---------------------------------------------------------------------------

/** Equivalent to document.querySelector — searches within the whole document. */
export function find(selector) {
  return document.querySelector(selector);
}

/** Like document.querySelectorAll but returns a plain Array. */
export function findAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// ---------------------------------------------------------------------------
// DOM Interaction Helpers
// ---------------------------------------------------------------------------

/** Set the value of an input/textarea and fire change + input events. */
export async function fillIn(selector, value) {
  const el = _getElement(selector);
  fireEvent.change(el, { target: { value } });
  fireEvent.input(el, { target: { value } });
  await settled();
}

/** Focus an element, firing focus + focusin events. */
export async function focus(selector) {
  const el = _getElement(selector);
  el.focus();
  fireEvent.focus(el);
  fireEvent.focusIn(el);
  await settled();
}

/** Blur an element, firing blur + focusout events. */
export async function blur(selector) {
  const el = _getElement(selector);
  el.blur();
  fireEvent.blur(el);
  fireEvent.focusOut(el);
  await settled();
}

/**
 * Click an element. Fires mousedown → (focus + focusin for form controls) →
 * mouseup → click, mirroring @ember/test-helpers behaviour.
 */
export async function click(selector, options = {}) {
  const el = _getElement(selector);
  const isFocusable = el.matches(
    'button, input, select, textarea, a[href], [tabindex]',
  );
  fireEvent.mouseDown(el, options);
  if (isFocusable) {
    el.focus();
    fireEvent.focus(el);
    fireEvent.focusIn(el);
  }
  fireEvent.mouseUp(el, options);
  fireEvent.click(el, options);
  await settled();
}

/** Double-click an element. */
export async function doubleClick(selector, options = {}) {
  const el = _getElement(selector);
  const isFocusable = el.matches(
    'button, input, select, textarea, a[href], [tabindex]',
  );
  fireEvent.mouseDown(el, options);
  if (isFocusable) {
    el.focus();
    fireEvent.focus(el);
    fireEvent.focusIn(el);
  }
  fireEvent.mouseUp(el, options);
  fireEvent.click(el, options);
  fireEvent.mouseDown(el, options);
  fireEvent.mouseUp(el, options);
  fireEvent.click(el, options);
  fireEvent.dblClick(el, options);
  await settled();
}

/**
 * Set the selected option(s) on a <select> element and fire change + input.
 * @param {string | Element} selector
 * @param {string | string[]} values  one or more option values to select
 * @param {boolean} keepPreviouslySelected  if true, additive selection
 */
export async function select(selector, values, keepPreviouslySelected = false) {
  const el = _getElement(selector);
  const valueList = Array.isArray(values) ? values : [values];
  for (const option of el.options) {
    if (!keepPreviouslySelected) option.selected = false;
    if (valueList.includes(option.value)) option.selected = true;
  }
  fireEvent.change(el);
  fireEvent.input(el);
  await settled();
}

/**
 * Trigger a keyboard event on an element.
 * Accepts Ember-style lowercase event names ('keyup', 'keydown', 'keypress').
 * @param {string | Element} selectorOrEl
 * @param {'keydown' | 'keyup' | 'keypress'} eventName
 * @param {number | string} key  numeric keyCode or string key name e.g. 'Enter'
 * @param {{ ctrlKey?, altKey?, shiftKey?, metaKey? }} modifiers
 */
export async function triggerKeyEvent(
  selectorOrEl,
  eventName,
  key,
  modifiers = {},
) {
  const el = _getElement(selectorOrEl);

  // Normalise 'keyup' → 'keyUp', 'keydown' → 'keyDown', 'keypress' → 'keyPress'
  const normalised = eventName.replace(
    /^(key)(up|down|press)$/i,
    (_, prefix, suffix) =>
      prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1).toLowerCase(),
  );

  const handler = fireEvent[normalised] ?? fireEvent[eventName];
  if (!handler)
    throw new Error(`fireEvent has no handler for event "${eventName}"`);

  const eventInit =
    typeof key === 'number'
      ? {
          keyCode: key,
          which: key,
          key: String.fromCharCode(key),
          ...modifiers,
        }
      : { key, ...modifiers };

  handler(el, eventInit);
  await settled();
}

/**
 * Dispatch an arbitrary DOM event on an element.
 * @param {string | Element} selector
 * @param {string} eventType  e.g. 'custom:event', 'mouseenter', 'change'
 * @param {object} options  merged into the event init dict
 */
export async function triggerEvent(selector, eventType, options = {}) {
  const el = _getElement(selector);
  const { bubbles = true, cancelable = true, ...rest } = options;
  // Use fireEvent if it has a named handler, otherwise dispatch manually
  const handler = fireEvent[eventType];
  if (handler) {
    handler(el, { bubbles, cancelable, ...rest });
  } else {
    el.dispatchEvent(new Event(eventType, { bubbles, cancelable, ...rest }));
  }
  await settled();
}

/**
 * Simulate character-by-character typing into an input/textarea.
 * Fires keydown → keypress → input (with updated value) → keyup per character,
 * then a final change event at the end.
 * @param {string | Element} selector
 * @param {string} text
 * @param {{ delay?: number }} options  ms between keystrokes (default 0)
 */
export async function typeIn(selector, text, { delay = 0 } = {}) {
  const el = _getElement(selector);
  el.focus();
  fireEvent.focus(el);
  fireEvent.focusIn(el);

  for (const char of text) {
    const keyCode = char.charCodeAt(0);
    const keyInit = { key: char, keyCode, which: keyCode };

    fireEvent.keyDown(el, keyInit);
    fireEvent.keyPress(el, keyInit);

    // Update value and fire input
    const newValue = el.value + char;
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set?.call(el, newValue);
    fireEvent.input(el, { target: { value: newValue } });

    fireEvent.keyUp(el, keyInit);

    if (delay > 0) await _waitForMs(delay);
  }

  fireEvent.change(el, { target: { value: el.value } });
  await settled();
}

/** Scroll an element to specific coordinates. */
export async function scrollTo(selector, x, y) {
  const el = _getElement(selector);
  el.scrollLeft = x;
  el.scrollTop = y;
  fireEvent.scroll(el);
  await settled();
}

// ---------------------------------------------------------------------------
// Wait Helpers
// ---------------------------------------------------------------------------

/**
 * Wait for a DOM element matching selector to appear.
 * Returns the element (or array of elements if count > 1).
 * @param {string} selector
 * @param {{ timeout?: number, count?: number | null }} options
 */
export async function waitFor(selector, { timeout = 1000, count = null } = {}) {
  return rtlWaitFor(
    () => {
      const els = Array.from(document.querySelectorAll(selector));
      if (count !== null) {
        if (els.length !== count)
          throw new Error(
            `Expected ${count} elements for "${selector}", found ${els.length}`,
          );
        return els;
      }
      if (!els.length) throw new Error(`Element "${selector}" not found`);
      return els.length === 1 ? els[0] : els;
    },
    { timeout },
  );
}

/**
 * Wait until callback returns a truthy value.
 * Polls every 10 ms up to timeout.
 * @param {() => any} callback
 * @param {{ timeout?: number, timeoutMessage?: string }} options
 */
export async function waitUntil(
  callback,
  { timeout = 1000, timeoutMessage = 'waitUntil timed out' } = {},
) {
  const deadline = Date.now() + timeout;
  return new Promise((resolve, reject) => {
    function check() {
      try {
        const result = callback();
        if (result) {
          resolve(result);
        } else if (Date.now() >= deadline) {
          reject(new Error(timeoutMessage));
        } else {
          setTimeout(check, 10);
        }
      } catch (err) {
        if (Date.now() >= deadline) {
          reject(err);
        } else {
          setTimeout(check, 10);
        }
      }
    }
    check();
  });
}

/**
 * Wait for an element to receive focus.
 * @param {string} selector
 * @param {{ timeout?: number }} options
 */
export async function waitForFocus(selector, { timeout = 1000 } = {}) {
  const el = await waitFor(selector, { timeout });
  if (document.activeElement === el) return el;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () =>
        reject(new Error(`waitForFocus timed out waiting for "${selector}"`)),
      timeout,
    );
    el.addEventListener(
      'focus',
      () => {
        clearTimeout(timer);
        resolve(el);
      },
      { once: true },
    );
  });
}

// ---------------------------------------------------------------------------
// Pause Helpers (useful for debugging)
// ---------------------------------------------------------------------------

let _resumeTestFn = null;

/**
 * Pause test execution. Resolves only when resumeTest() is called.
 * In a browser context this lets you inspect the DOM mid-test.
 */
export function pauseTest() {
  // eslint-disable-next-line no-console
  console.log(
    '[react-qunit-test-helpers] Test paused — call resumeTest() in the console to continue.',
  );
  return new Promise((resolve) => {
    _resumeTestFn = resolve;
    window.resumeTest = () => resumeTest();
  });
}

/** Resume a test paused by pauseTest(). */
export function resumeTest() {
  if (_resumeTestFn) {
    _resumeTestFn();
    _resumeTestFn = null;
  }
  delete window.resumeTest;
}

// ---------------------------------------------------------------------------
// Routing Helpers
// ---------------------------------------------------------------------------

/**
 * Navigate to a path in the app using the History API and fire a popstate
 * event so React Router picks up the change.
 * @param {string} path  e.g. '/docs/form-submission'
 */
export async function visit(path) {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  console.log('pre');
  // Match a link whose href attribute is exactly `path` or `path?...`
  function findLink(pathname) {
    return Array.from(document.querySelectorAll(`a[href]`)).find((el) => {
      const href = el.getAttribute('href');
      return href === pathname || href?.startsWith(pathname + '?');
    });
  }
  console.log('post');
  // if (!findLink(path)) {
  await click(findLink('/docs'));
  // }
  await click(findLink(path));
  await settled();
}
