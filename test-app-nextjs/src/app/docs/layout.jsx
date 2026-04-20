'use client';

import { useState } from 'react';
import Header from '../../components/Header.jsx';
import MainNav from '../../components/MainNav.jsx';

export default function DocsLayout({ children }) {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <div id="root">
      <Header />
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
          {children}
        </main>
      </div>
    </div>
  );
}
