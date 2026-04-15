// src/tests/test-helper.js
import QUnit from 'qunit';

// Boot the app exactly as main.jsx does (Provider, CSS, etc.)
import '../main.jsx';

// Import all test modules (they register with QUnit)
import './qunit/form-submission-test.js';

QUnit.start();
