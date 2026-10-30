// Hooks
export { default as useHeadings } from './hooks/useHeadings.js';
export { default as useActiveHeading } from './hooks/useActiveHeading.js';

// Layout / nav
export { default as DocsMain } from './components/DocsMain.jsx';
export { default as DocsNav } from './components/DocsNav.jsx';
export { default as DocsNavList } from './components/DocsNavList.jsx';
export { default as DocsNavItem } from './components/DocsNavItem.jsx';
export { default as DocsLink } from './components/DocsLink.jsx';
export {
  default as DocsSection,
  useDocsSectionHeadings,
} from './components/DocsSection.jsx';
export { default as OnThisPage } from './components/OnThisPage.jsx';
export { default as DocsHeader } from './components/DocsHeader.jsx';
export { default as DocsHero } from './components/DocsHero.jsx';
export { default as DocsLogo } from './components/DocsLogo.jsx';

// Demos / snippets
export {
  SnippetsProvider,
  useSnippet,
} from './components/SnippetsProvider.jsx';
export { default as DocsDemo } from './components/DocsDemo.jsx';
export { default as DocsExample } from './components/DocsExample.jsx';
export { default as DocsSnippet } from './components/DocsSnippet.jsx';
export { default as DocsCodeHighlight } from './components/DocsCodeHighlight.jsx';

// Misc
export { default as DocsModalDialog } from './components/DocsModalDialog.jsx';
export { default as DocsKeyboardShortcuts } from './components/DocsKeyboardShortcuts.jsx';
export { default as mdxComponents } from './components/mdxComponents.jsx';
