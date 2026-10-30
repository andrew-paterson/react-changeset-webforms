import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { OnThisPage, useHeadings } from 'react-docs-utils';
import Header from './components/Header.jsx';
import MainNav from './components/MainNav.jsx';
import './App.css';

// Pages compiled in-memory from src/pages/docs/*.md via docsMarkdownPagesPlugin.
import docsPages from 'virtual:docs-pages';

import NotFound from './pages/NotFound.jsx';
import Index from './pages/Index.jsx';

function DocsLayout() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const mainRef = useRef(null);
  const headings = useHeadings(mainRef, {
    selector: '.docs-md__h2[id], .docs-md__h3[id]',
  });

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
      <main ref={mainRef} className="docs-flex-1 docs-min-w-0 docs-px-4 md:docs-px-8 docs-py-8">
        <Routes>
          {Object.entries(docsPages).map(([slug, Page]) => (
            <Route
              key={slug}
              path={slug === 'index' ? '/' : slug}
              element={<Page />}
            />
          ))}
        </Routes>
      </main>
      <OnThisPage headings={headings} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/docs/*" element={<DocsLayout />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
