// ---------------------------------------------------------------------------
// DOM interaction helpers (mirrors @ember/test-helpers API)
// ---------------------------------------------------------------------------

import { fireEvent, waitFor } from '@testing-library/react';

export async function _waitForMs(ms) {
  const startTimeEpoch = Date.now();
  await waitUntil(
    () => {
      return Date.now() - startTimeEpoch > ms;
    },
    { timeout: ms + 1000 },
  );
  return;
}

function _getElement(arg) {
  let element;
  if (typeof arg === 'string') {
    element = find(arg);
    if (!element) {
      throw `No element with selector ${arg} was found`;
    }
  } else {
    element = arg;
  }
  return element;
}

function _getElements(arg, indexes) {
  let elements;
  if (typeof arg === 'string') {
    elements = findAll(arg);
  } else {
    elements = arg;
  }
  if (indexes?.length) {
    elements = indexes.map((index) => elements[index]);
  }
  return elements.filter((el) => el);
}

export async function fillIn(selector, value) {
  const el = _getElement(selector);
  fireEvent.change(el, { target: { value } });
  await _waitForMs(0);
}

export async function focus(selector) {
  const el = _getElement(selector);
  el.focus();
  fireEvent.focus(el);
  await _waitForMs(0);
}

export async function blur(selector) {
  const el = _getElement(selector);
  el.blur();
  fireEvent.blur(el);
  await _waitForMs(0);
}

export async function click(selector) {
  const el = _getElement(selector);
  el.click();
  fireEvent.click(el);
  await _waitForMs(0);
}

export async function triggerKeyEvent(selectorOrEl, eventName, keyCode) {
  const el = _getElement(selectorOrEl);
  // Normalise Ember-style lowercase names ('keyup', 'keydown') to RTL camelCase ('keyUp', 'keyDown')
  const normalise = (name) => name.replace(/^(\w+?)(up|down|press|move|enter|leave|over|out|cancel|end|start)$/i, (_, prefix, suffix) => prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1).toLowerCase());
  const handler = fireEvent[normalise(eventName)] ?? fireEvent[eventName];
  if (!handler) throw new Error(`fireEvent has no handler for event "${eventName}"`);
  handler(el, { keyCode, which: keyCode, key: String.fromCharCode(keyCode) });
  await _waitForMs(0);
}

export function find(selector) {
  return document.querySelector(selector);
}

export function findAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export async function waitForElement(selector, timeout = 5000) {
  return waitFor(
    () => {
      const el = document.querySelector(selector);
      if (!el) throw new Error(`Element "${selector}" not found`);
      return el;
    },
    { timeout },
  );
}

export async function waitUntil(callback, timeout = 5000) {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      try {
        const result = callback();
        if (result) {
          resolve(result);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('waitUntil timed out'));
        } else {
          requestAnimationFrame(check);
        }
      } catch (error) {
        reject(error);
      }
    }
    check();
  });
}
