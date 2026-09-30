import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { docsSnippetsPlugin } from 'react-docs-utils/vite';
import { docsMarkdownPagesPlugin } from './vite-plugins/docs-markdown-pages-plugin.js';

// Pages whose generated output exactly matches their current src/pages
// file (verified via scripts/diff-check.mjs). Only these are compiled live
// from markdown — the rest have hand-edits beyond generation and stay on
// static imports until migrated. Keeping this list explicit also avoids
// eagerly compiling markdown pages with unrelated, pre-existing broken
// references (e.g. manipulating-element-class-names-and-attrs.md refers to
// a ShowClassesDemo.jsx that doesn't exist in the repo).
const LIVE_MARKDOWN_PAGES = [
  'configuration-options',
  'input',
  'textarea',
  'single-checkbox',
  'static-content-field',
  'hiding-and-showing-fields',
  'form-methods',
  'field-methods',
  'debug-mode',
  'test-helpers',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    docsSnippetsPlugin({ dirs: ['./src', '../react-changeset-webforms/src'] }),
    docsMarkdownPagesPlugin({ include: LIVE_MARKDOWN_PAGES }),
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
