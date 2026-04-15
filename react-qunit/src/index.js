// ---------------------------------------------------------------------------
// react-qunit — mirrors the ember-qunit API for React + QUnit browser tests.
//
// Exports:
//   setupTest(hooks, options?)            — base context setup
//   setupRenderingTest(hooks, options?)   — adds component rendering helpers
//   setupApplicationTest(hooks, options?) — full application context
//
// Each adds to the QUnit test context (i.e. `this` inside test callbacks):
//   this.element      — the #react-testing DOM node (app root)
//   this.owner        — a lightweight service-locator / registry stub
//   this.pauseTest()  — pause execution for debugging
//   this.resumeTest() — resume after pauseTest()
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Internal: global pause/resume state
// ---------------------------------------------------------------------------

let _resumeTestFn = null;

function _pauseTest(assert) {
  // Disable the QUnit timeout so the paused test doesn't auto-fail
  if (assert && typeof assert.timeout === 'function') {
    assert.timeout(0);
  }
  // eslint-disable-next-line no-console
  console.log('[react-qunit] Test paused — call this.resumeTest() to continue.');
  return new Promise((resolve) => {
    _resumeTestFn = resolve;
  });
}

function _resumeTest() {
  if (_resumeTestFn) {
    _resumeTestFn();
    _resumeTestFn = null;
  }
}

// ---------------------------------------------------------------------------
// Internal: owner (service-locator stub)
//
// In Ember, `this.owner` is the application's DI container. In React there
// is no equivalent, so we provide a lightweight Map-backed registry that lets
// tests register/look up arbitrary services if needed.
// ---------------------------------------------------------------------------

function _createOwner() {
  const _registry = new Map();
  return {
    /**
     * Register a factory or value under a full name, e.g.
     *   this.owner.register('service:my-service', MyServiceClass)
     */
    register(fullName, factory) {
      _registry.set(fullName, factory);
    },
    /**
     * Look up a registered value by full name.
     *   const svc = this.owner.lookup('service:my-service');
     */
    lookup(fullName) {
      return _registry.get(fullName) ?? null;
    },
    /**
     * Returns true if a name has been registered.
     */
    has(fullName) {
      return _registry.has(fullName);
    },
    /**
     * Unregister a name (useful in afterEach teardown).
     */
    unregister(fullName) {
      _registry.delete(fullName);
    },
    /** Clear the entire registry (called during teardown). */
    _reset() {
      _registry.clear();
    },
  };
}

// ---------------------------------------------------------------------------
// Internal: resolve the application root element.
//
// Mirrors Ember's #ember-testing container. We look for #react-testing first
// (matching the structure in index.html), then fall back to #root.
// ---------------------------------------------------------------------------

function _getRootElement() {
  return document.getElementById('react-testing') ?? document.getElementById('root') ?? document.body;
}

// ---------------------------------------------------------------------------
// setupTest
//
// Base hook used by both setupRenderingTest and setupApplicationTest.
// Adds this.owner, this.element, this.pauseTest, this.resumeTest to the
// QUnit test context.
// ---------------------------------------------------------------------------

export function setupTest(hooks, _options = {}) {
  hooks.beforeEach(function (assert) {
    // this.element — the application root DOM node
    this.element = _getRootElement();

    // this.owner — lightweight service registry
    this.owner = _createOwner();

    // this.pauseTest / this.resumeTest — debugging helpers
    this.pauseTest = () => _pauseTest(assert);
    this.resumeTest = () => _resumeTest();
  });

  hooks.afterEach(function () {
    // Clean up the owner registry between tests for isolation
    if (this.owner && typeof this.owner._reset === 'function') {
      this.owner._reset();
    }
    this.owner = null;
    this.element = null;
  });
}

// ---------------------------------------------------------------------------
// setupRenderingTest
//
// Extends setupTest with helpers suited to rendering individual components.
// Adds this.render(jsx) and this.clearRender() to the test context.
//
// Requires react-dom/client and React to be available in the host app.
// ---------------------------------------------------------------------------

export function setupRenderingTest(hooks, options = {}) {
  setupTest(hooks, options);

  hooks.beforeEach(async function () {
    const { createRoot } = await import('react-dom/client');

    // Create a dedicated container inside the testing fixture so renders are
    // isolated from the main app.
    const container = document.createElement('div');
    this.element.appendChild(container);
    this._renderContainer = container;
    this._renderRoot = createRoot(container);

    /**
     * Render a JSX element into the test container.
     * Equivalent to Ember's `render(hbs`...`)`.
     * @param {import('react').ReactElement} jsx
     */
    this.render = (jsx) => {
      return new Promise((resolve) => {
        this._renderRoot.render(jsx);
        // Flush microtasks so React has committed before assertions run
        setTimeout(resolve, 0);
      });
    };

    /**
     * Unmount the previously rendered component.
     */
    this.clearRender = () => {
      return new Promise((resolve) => {
        this._renderRoot.unmount();
        setTimeout(resolve, 0);
      });
    };
  });

  hooks.afterEach(function () {
    if (this._renderRoot) {
      this._renderRoot.unmount();
      this._renderRoot = null;
    }
    if (this._renderContainer && this._renderContainer.parentNode) {
      this._renderContainer.parentNode.removeChild(this._renderContainer);
      this._renderContainer = null;
    }
  });
}

// ---------------------------------------------------------------------------
// setupApplicationTest
//
// For full application / acceptance tests where the whole app is already
// mounted in the DOM (via index.html + main.jsx). Does not re-render — it
// just sets up the test context helpers and points this.element at the live
// app root.
//
// This is the direct equivalent of ember-qunit's setupApplicationTest.
// ---------------------------------------------------------------------------

export function setupApplicationTest(hooks, options = {}) {
  setupTest(hooks, options);
  // No additional beforeEach needed — the app is already rendered by
  // test-helper.jsx importing main.jsx. Tests interact with the live DOM
  // directly via find(), fillIn(), click() etc. from test-helpers.js.
}
