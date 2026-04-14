// ---------------------------------------------------------------------------
// DOM interaction helpers (mirrors @ember/test-helpers API)
// ---------------------------------------------------------------------------

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
  fireEvent[eventName](el, { keyCode, which: keyCode, key: String.fromCharCode(keyCode) });
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
