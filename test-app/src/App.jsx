import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import MainNav from './components/MainNav.jsx';
import './App.css';

// Pages compiled in-memory from markdown/docs/*.md via docsMarkdownPagesPlugin.
// Which pages are included is controlled by LIVE_MARKDOWN_PAGES in vite.config.js.
import docsPages from 'virtual:docs-pages';

// Static fallbacks; a page with the same slug in docsPages takes precedence.
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

const staticPages = {
  index: Index,
  'basic-usage': BasicUsage,
  'creating-custom-fields': CreatingCustomFields,
  'action-handling': ActionHandling,
  'form-settings': FormSettings,
  'field-settings': FieldSettings,
  'form-submission': FormSubmission,
  'field-validation': FieldValidation,
  'integrating-custom-validators': IntegratingCustomValidators,
  'clonable-form-fields': ClonableFormFields,
  'custom-components': CustomComponents,
  'manipulating-element-class-names-and-attrs':
    ManipulatingElementClassNamesAndAttrs,
  'radio-button-group': RadioButtonGroup,
  'checkbox-group': CheckboxGroup,
  clicker: Clicker,
  select: Select,
};

const pages = { ...staticPages, ...docsPages };

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
          {Object.entries(pages).map(([slug, Page]) => (
            <Route
              key={slug}
              path={slug === 'index' ? '/' : slug}
              element={<Page />}
            />
          ))}
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
