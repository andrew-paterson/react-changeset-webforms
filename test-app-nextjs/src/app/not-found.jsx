// export default function NotFound() {
//   return (
//     <>
//       <div className="docs-md">
//         <h1>Not found</h1>
//       </div>
//     </>
//   );
// }

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MainNav from '../components/MainNav.jsx';

export default function DocsLayout({ children }) {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const pathname = usePathname();

  return (
    <>
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
          <h1>404</h1>
          <p>
            Page not found: <code>{pathname}</code>
          </p>
        </main>
      </div>
    </>
  );
}
