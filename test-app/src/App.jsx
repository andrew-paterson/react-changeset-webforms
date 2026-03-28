import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainNav from './components/MainNav.jsx';
import './App.css';

import Index from './pages/Index.jsx';
import BasicUsage from './pages/BasicUsage.jsx';
import ConfigurationOptions from './pages/ConfigurationOptions.jsx';
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
import Input from './pages/Input.jsx';
import Textarea from './pages/Textarea.jsx';
import SingleCheckbox from './pages/SingleCheckbox.jsx';
import RadioButtonGroup from './pages/RadioButtonGroup.jsx';
import CheckboxGroup from './pages/CheckboxGroup.jsx';
import StaticContentField from './pages/StaticContentField.jsx';
import Clicker from './pages/Clicker.jsx';
import HidingAndShowingFields from './pages/HidingAndShowingFields.jsx';
import FormMethods from './pages/FormMethods.jsx';
import FieldMethods from './pages/FieldMethods.jsx';
import DebugMode from './pages/DebugMode.jsx';
import TestHelpers from './pages/TestHelpers.jsx';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';

function DocsLayout() {
  return (
    <div className="md:docs-flex docs-w-full">
      <MainNav />
      <main className="docs-flex-1 docs-min-w-0 docs-px-4 md:docs-px-8 docs-py-8">
        <Routes>
          <Route
            path="/"
            element={<Index />}
          />
          <Route
            path="basic-usage"
            element={<BasicUsage />}
          />
          <Route
            path="configuration-options"
            element={<ConfigurationOptions />}
          />
          <Route
            path="creating-custom-fields"
            element={<CreatingCustomFields />}
          />
          <Route
            path="action-handling"
            element={<ActionHandling />}
          />
          <Route
            path="form-settings"
            element={<FormSettings />}
          />
          <Route
            path="field-settings"
            element={<FieldSettings />}
          />
          <Route
            path="form-submission"
            element={<FormSubmission />}
          />
          <Route
            path="field-validation"
            element={<FieldValidation />}
          />
          <Route
            path="integrating-custom-validators"
            element={<IntegratingCustomValidators />}
          />
          <Route
            path="clonable-form-fields"
            element={<ClonableFormFields />}
          />
          <Route
            path="custom-components"
            element={<CustomComponents />}
          />
          <Route
            path="manipulating-element-class-names-and-attrs"
            element={<ManipulatingElementClassNamesAndAttrs />}
          />
          <Route
            path="input"
            element={<Input />}
          />
          <Route
            path="textarea"
            element={<Textarea />}
          />
          <Route
            path="single-checkbox"
            element={<SingleCheckbox />}
          />
          <Route
            path="radio-button-group"
            element={<RadioButtonGroup />}
          />
          <Route
            path="checkbox-group"
            element={<CheckboxGroup />}
          />
          <Route
            path="static-content-field"
            element={<StaticContentField />}
          />
          <Route
            path="clicker"
            element={<Clicker />}
          />
          <Route
            path="hiding-and-showing-fields"
            element={<HidingAndShowingFields />}
          />
          <Route
            path="form-methods"
            element={<FormMethods />}
          />
          <Route
            path="field-methods"
            element={<FieldMethods />}
          />
          <Route
            path="debug-mode"
            element={<DebugMode />}
          />
          <Route
            path="test-helpers"
            element={<TestHelpers />}
          />
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
        <Route
          path="/docs/*"
          element={<DocsLayout />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
