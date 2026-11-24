'use client';

import { useRef, useState } from 'react';
import { OnThisPage, useHeadings } from 'react-docs-utils';
import MainNav from './MainNav.jsx';

export default function DocsShell({ children }) {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const mainRef = useRef(null);
  const headings = useHeadings(mainRef, {
    selector: '.docs-md__h2[id], .docs-md__h3[id]',
  });

  return (
    <div className="md:docs-flex docs-w-full">
      <div
        className="mobile-menu docs-text-right docs-px-4 md:docs-px-6 docs-mt-4"
        onClick={() => setIsMenuToggled(!isMenuToggled)}
      >
        <button className="docs-text-grey-darkest docs-py-2 docs-text-xs docs-rounded docs-uppercase docs-font-medium">
          ☰ Menu
        </button>
      </div>
      <MainNav isMenuToggled={isMenuToggled} />
      <main
        ref={mainRef}
        className="docs-flex-1 docs-min-w-0 docs-px-4 md:docs-px-8 docs-py-8"
      >
        <div className="docs-md">{children}</div>
      </main>
      <OnThisPage headings={headings} />
    </div>
  );
}
