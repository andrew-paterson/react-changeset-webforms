# react-docs-utils

Lightweight, router-agnostic React components for building addon-style
documentation sites — extracted from patterns proven in `test-app` and
`test-app-nextjs`. A pragmatic, simplified analogue of `ember-cli-addon-docs`,
minus the markdown-to-JSX compiler and API-doc auto-extraction (docs pages are
hand-written JSX; code snippets are extracted from source comments at build
time via a small script).

## Install (workspace)

Already registered in `pnpm-workspace.yaml`. Add as a dependency:

```json
"dependencies": {
  "react-docs-utils": "workspace:*"
}
```

## Features

- **Auto-generated "On This Page" sub-nav** — wrap your page content in
  `<DocsSection>`, give your `<h2>`/`<h3>` elements `id`s, and `<OnThisPage>`
  renders the list automatically (with scroll-spy active-heading highlighting).
- **Data-driven sidebar nav** — `<DocsNav>` takes a `sections` array, no
  hand-written link markup per page.
- **Demo + snippet components** — `<DocsDemo>`, `<DocsExample>`,
  `<DocsSnippet>` for "live example + source code" doc blocks.
- **Full component set ported from `ember-cli-addon-docs`** (simplified):
  `DocsHeader`, `DocsHero`, `DocsLogo`, `DocsModalDialog`,
  `DocsKeyboardShortcuts`, `DocsCodeHighlight`.
- **`create-snippets` build script** — extracts `// BEGIN-SNIPPET name` /
  `// END-SNIPPET` blocks from your source into a flat JSON-like module,
  consumed by `<DocsSnippet>` via `<SnippetsProvider>`.

## Usage

### 1. Generate snippets at build time

```jsonc
// package.json
{
  "scripts": {
    "create-snippets": "node ../react-docs-utils/bin/create-snippets.js ./src ../some-addon/src -o ./src/snippets.js",
    "predev": "pnpm create-snippets",
    "prebuild": "pnpm create-snippets",
  },
}
```

Mark code you want to expose as a snippet:

```js
// BEGIN-SNIPPET my-example.js
const x = 1;
// END-SNIPPET
```

### 2. Provide snippets + wrap your app

```jsx
import { SnippetsProvider } from 'react-docs-utils';
import snippets from './snippets.js';

<SnippetsProvider snippets={snippets}>
  <App />
</SnippetsProvider>;
```

### 3. Auto-generated on-this-page nav

```jsx
import { DocsSection, OnThisPage } from 'react-docs-utils';

function MyDocsPage() {
  return (
    <>
      <DocsSection deps={[location.pathname]}>
        <h1 id="my-page">My page</h1>
        <h2 id="usage">Usage</h2>
        <p>...</p>
      </DocsSection>
      <OnThisPage />
    </>
  );
}
```

### 4. Demo blocks

```jsx
import { DocsDemo, DocsExample, DocsSnippet } from 'react-docs-utils';

<DocsDemo>
  <DocsExample name="my-example.js">
    <MyLiveComponent />
  </DocsExample>
  <DocsSnippet name="my-example.js" label="my-example.js" />
</DocsDemo>;
```

### 5. Sidebar nav

```jsx
import { DocsNav } from 'react-docs-utils';
import { Link, useLocation } from 'react-router-dom';

const sections = [
  {
    title: 'Introduction',
    items: [{ to: '/docs', label: 'Introduction' }],
  },
  {
    title: 'Validation',
    items: [{ to: '/docs/field-validation', label: 'Field validation' }],
  },
];

<DocsNav
  sections={sections}
  currentPath={useLocation().pathname}
  linkComponent={Link}
/>;
```

## Not included (by design)

- Markdown-to-JSX/Handlebars compilation — write your docs pages as plain JSX.
- Automatic API reference generation from source comments (`Project`/`Class`/
  `Component` models in `ember-cli-addon-docs`) — out of scope; add your own
  if needed, `DocsMain`/`DocsNav` will happily render whatever nav data you
  give them regardless of how it was generated.
