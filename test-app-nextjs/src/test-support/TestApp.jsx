'use client';

/**
 * Standalone app rendered into #root inside #react-testing for QUnit browser
 * tests. Uses MemoryRouter so the browser URL stays at /tests while the app
 * navigates internally — identical behaviour to the Ember test setup.
 */
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './TestHeader.jsx';
import MainNav from './TestMainNav.jsx';

// Pages — imported from the same components the Next.js pages use
import Index from '../app/(docs)/page.jsx';
import DocsIndex from '../app/(docs)/docs/page.jsx';
import BasicUsage from '../app/(docs)/docs/basic-usage/page.jsx';
import ConfigurationOptions from '../app/(docs)/docs/configuration-options/page.jsx';
import CreatingCustomFields from '../app/(docs)/docs/creating-custom-fields/page.jsx';
import ActionHandling from '../app/(docs)/docs/action-handling/page.jsx';
import FormSettings from '../app/(docs)/docs/form-settings/page.jsx';
import FieldSettings from '../app/(docs)/docs/field-settings/page.jsx';
import FormSubmission from '../app/(docs)/docs/form-submission/page.jsx';
import FieldValidation from '../app/(docs)/docs/field-validation/page.jsx';
import IntegratingCustomValidators from '../app/(docs)/docs/integrating-custom-validators/page.jsx';
import ClonableFormFields from '../app/(docs)/docs/clonable-form-fields/page.jsx';
import ManipulatingElementClassNamesAndAttrs from '../app/(docs)/docs/manipulating-element-class-names-and-attrs/page.jsx';
import Input from '../app/(docs)/docs/input/page.jsx';
import Textarea from '../app/(docs)/docs/textarea/page.jsx';
import SingleCheckbox from '../app/(docs)/docs/single-checkbox/page.jsx';
import RadioButtonGroup from '../app/(docs)/docs/radio-button-group/page.jsx';
import CheckboxGroup from '../app/(docs)/docs/checkbox-group/page.jsx';
import StaticContentField from '../app/(docs)/docs/static-content-field/page.jsx';
import Clicker from '../app/(docs)/docs/clicker/page.jsx';
import Select from '../app/(docs)/docs/select/page.jsx';
import HidingAndShowingFields from '../app/(docs)/docs/hiding-and-showing-fields/page.jsx';
import FormMethods from '../app/(docs)/docs/form-methods/page.jsx';
import FieldMethods from '../app/(docs)/docs/field-methods/page.jsx';
import DebugMode from '../app/(docs)/docs/debug-mode/page.jsx';
import TestHelpers from '../app/(docs)/docs/test-helpers/page.jsx';

function DocsLayout() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  return (
    <div>
      <Header />
      <div className="md:docs-flex docs-w-full">
        <div className="mobile-menu docs-text-right docs-px-4 md:docs-px-6 docs-mt-4">
          <button
            className="docs-text-grey-darkest docs-py-2 docs-text-xs docs-rounded docs-uppercase docs-font-medium"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            ☰ Menu
          </button>
        </div>
        <MainNav isMenuToggled={isMenuToggled} />
        <main className="docs-flex-1 docs-min-w-0 docs-px-4 md:docs-px-8 docs-py-8">
          <Routes>
            <Route index element={<DocsIndex />} />
            <Route path="basic-usage" element={<BasicUsage />} />
            <Route
              path="configuration-options"
              element={<ConfigurationOptions />}
            />
            <Route
              path="creating-custom-fields"
              element={<CreatingCustomFields />}
            />
            <Route path="action-handling" element={<ActionHandling />} />
            <Route path="form-settings" element={<FormSettings />} />
            <Route path="field-settings" element={<FieldSettings />} />
            <Route path="form-submission" element={<FormSubmission />} />
            <Route path="field-validation" element={<FieldValidation />} />
            <Route
              path="integrating-custom-validators"
              element={<IntegratingCustomValidators />}
            />
            <Route
              path="clonable-form-fields"
              element={<ClonableFormFields />}
            />
            <Route
              path="manipulating-element-class-names-and-attrs"
              element={<ManipulatingElementClassNamesAndAttrs />}
            />
            <Route path="input" element={<Input />} />
            <Route path="textarea" element={<Textarea />} />
            <Route path="single-checkbox" element={<SingleCheckbox />} />
            <Route path="radio-button-group" element={<RadioButtonGroup />} />
            <Route path="checkbox-group" element={<CheckboxGroup />} />
            <Route path="select" element={<Select />} />
            <Route
              path="static-content-field"
              element={<StaticContentField />}
            />
            <Route path="clicker" element={<Clicker />} />
            <Route
              path="hiding-and-showing-fields"
              element={<HidingAndShowingFields />}
            />
            <Route path="form-methods" element={<FormMethods />} />
            <Route path="field-methods" element={<FieldMethods />} />
            <Route path="debug-mode" element={<DebugMode />} />
            <Route path="test-helpers" element={<TestHelpers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function TestApp() {
  return (
    <MemoryRouter initialEntries={['/docs']} initialIndex={0}>
      <Routes>
        <Route path="/docs/*" element={<DocsLayout />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </MemoryRouter>
  );
}
