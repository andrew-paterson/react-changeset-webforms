import path from 'path';
import { extractSnippets } from 'react-docs-utils/vite/snippet-extraction.js';
import Providers from '../../components/Providers.jsx';
import Header from '../../components/Header.jsx';

// Extracted in memory at build/request time; no snippets file is written.
const snippets = extractSnippets([
  path.resolve('src'),
  path.resolve('../react-changeset-webforms/src'),
]);

export default function DocsLayout({ children }) {
  return (
    <div id="root">
      <Header />
      <Providers snippets={snippets}>{children}</Providers>
    </div>
  );
}
