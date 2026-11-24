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

import Index from '../app/(docs)/page.jsx';

// Every docs page.mdx under app/(docs)/docs, keyed by slug.
const ctx = require.context('../app/(docs)/docs', true, /page\.mdx$/);
const pages = ctx.keys().map((key) => {
  const MdxPage = ctx(key).default;
  const slug = key.replace(/^\.\//, '').replace(/\/?page\.mdx$/, '');
  return { slug, MdxPage };
});

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
            {pages.map(({ slug, MdxPage }) => (
              <Route
                key={slug}
                index={slug === ''}
                path={slug || undefined}
                element={
                  <div className="docs-md">
                    <MdxPage />
                  </div>
                }
              />
            ))}
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
