import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { docsSnippetsPlugin } from 'react-docs-utils/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // MDX must run before the React plugin so the generated JSX is transformed.
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    react({ include: /\.(jsx|js|mdx)$/ }),
    docsSnippetsPlugin({ dirs: ['./src', '../react-changeset-webforms/src'] }),
  ],
  optimizeDeps: {
    // Exclude locally-linked packages from pre-bundling so that changes to
    // their source are picked up immediately without a cache bust.
    // exclude: ['validated-changeset-webforms', 'validated-changeset'],
  },
  root: './',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    globals: true,
    include: ['src/tests/**/*-test.{js,jsx,ts,tsx}'],
  },
});
