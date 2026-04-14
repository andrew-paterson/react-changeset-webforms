import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, waitFor } from '@testing-library/react';
import { renderWithProvider } from '../test-support/render-with-provider.jsx';
import els from '../test-support/element-selectors.js';
import DefaultFormSubmission from '../components/demos/DefaultFormSubmission.jsx';
import CustomFormSubmission from '../components/demos/CustomFormSubmission.jsx';

import { visit, fillIn, blur, click, waitFor, find, triggerKeyEvent } from 'react-changeset-webforms/test-support/test-helpers';
import testEls from './test-selectors';
import { passedValidation, failedValidation, wasValidated, noneValidated } from 'react-changeset-webforms/test-support/helpers';
import validationTestHelpersDefaults from 'react-changeset-webforms/test-support/validation-test-helpers-defaults';

afterEach(() => cleanup());

describe('Form submission | Basics', () => {});

// ---------------------------------------------------------------------------
// Default form submission
// ---------------------------------------------------------------------------

describe('Form submission | Default submission', () => {});

// ---------------------------------------------------------------------------
// Custom form submission
// ---------------------------------------------------------------------------

describe('Form submission | Custom submission', () => {});
