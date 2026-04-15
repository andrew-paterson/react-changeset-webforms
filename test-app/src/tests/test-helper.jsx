import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start } from 'react-qunit';

setup(QUnit.assert, {
  getRootElement: () => document.getElementById('react-testing'),
});

// Boot the app exactly as main.jsx does (Provider, CSS, etc.)
import '../main.jsx';

QUnit.config.testTimeout = 10000000000000000;

// Import all test modules (they register with QUnit)
import './qunit/form-submission-test.js';

start();
