import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { OnThisPage, useHeadings, mdxComponents } from 'react-docs-utils';
import Header from './components/Header.jsx';
import MainNav from './components/MainNav.jsx';
import NotFound from './pages/NotFound.jsx';
import Index from './pages/Index.jsx';
import './App.css';

// Docs pages: every src/pages/docs/*.mdx, keyed by file name.
const pages = Object.fromEntries(
  Object.entries(
    import.meta.glob('./pages/docs/*.mdx', { eager: true }),
  ).map(([file, mod]) => {
    const MdxPage = mod.default;
    const Page = () => (
      <div className="docs-md">
        <MdxPage components={mdxComponents} />
      </div>
    );
    return [file.match(/([^/]+)\.mdx$/)[1], Page];
  }),
);

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
          {Object.entries(pages).map(([slug, Page]) => (
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
