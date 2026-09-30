import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import MainNav from './components/MainNav.jsx';
import './App.css';

// Pages compiled in-memory from markdown/docs/*.md via the
// docsMarkdownPagesPlugin. Edits to the .md source are picked up live in
// dev (full reload) with no build step required.
//
// Only pages whose generated output exactly matches their current
// src/pages/*.jsx file are sourced this way (verified via
// scripts/diff-check.mjs). Pages with hand-edits beyond what the markdown
// generator produces remain on static imports below until their edits are
// migrated into the markdown source.
import docsPages from 'virtual:docs-pages';
const ConfigurationOptions = docsPages['configuration-options'];
const Input = docsPages['input'];
const Textarea = docsPages['textarea'];
const SingleCheckbox = docsPages['single-checkbox'];
const StaticContentField = docsPages['static-content-field'];
const HidingAndShowingFields = docsPages['hiding-and-showing-fields'];
const FormMethods = docsPages['form-methods'];
const FieldMethods = docsPages['field-methods'];
const DebugMode = docsPages['debug-mode'];
const TestHelpers = docsPages['test-helpers'];

// Hand-edited beyond generated output (see diff-check.mjs) — kept static.
import Index from './pages/Index.jsx';
import BasicUsage from './pages/BasicUsage.jsx';
import CreatingCustomFields from './pages/CreatingCustomFields.jsx';
import ActionHandling from './pages/ActionHandling.jsx';
import FormSettings from './pages/FormSettings.jsx';
import FieldSettings from './pages/FieldSettings.jsx';
import FormSubmission from './pages/FormSubmission.jsx';
import FieldValidation from './pages/FieldValidation.jsx';
import IntegratingCustomValidators from './pages/IntegratingCustomValidators.jsx';
import ClonableFormFields from './pages/ClonableFormFields.jsx';
import CustomComponents from './pages/CustomComponents.jsx';
import ManipulatingElementClassNamesAndAttrs from './pages/ManipulatingElementClassNamesAndAttrs.jsx';
import RadioButtonGroup from './pages/RadioButtonGroup.jsx';
import CheckboxGroup from './pages/CheckboxGroup.jsx';
import Clicker from './pages/Clicker.jsx';
import Select from './pages/Select.jsx';

import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';

function DocsLayout() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <div className="md:docs-flex docs-w-full">
      <div
        class="mobile-menu docs-text-right docs-px-4 md:docs-px-6 docs-mt-4"
        onClick={() => setIsMenuToggled(!isMenuToggled)}
      >
        <button class="docs-text-grey-darkest docs-py-2 docs-text-xs docs-rounded docs-uppercase docs-font-medium">
          ☰ Menu
        </button>
      </div>
      <MainNav isMenuToggled={isMenuToggled} />
      <main className="docs-flex-1 docs-min-w-0 docs-px-4 md:docs-px-8 docs-py-8">
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="clonable-form-fields" element={<ClonableFormFields />} />
          <Route path="custom-components" element={<CustomComponents />} />
          <Route
            path="manipulating-element-class-names-and-attrs"
            element={<ManipulatingElementClassNamesAndAttrs />}
          />
          <Route path="input" element={<Input />} />
          <Route path="textarea" element={<Textarea />} />
          <Route path="single-checkbox" element={<SingleCheckbox />} />
          <Route path="radio-button-group" element={<RadioButtonGroup />} />
          <Route path="checkbox-group" element={<CheckboxGroup />} />
          <Route path="static-content-field" element={<StaticContentField />} />
          <Route path="clicker" element={<Clicker />} />
          <Route path="select" element={<Select />} />
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/docs/*" element={<DocsLayout />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
