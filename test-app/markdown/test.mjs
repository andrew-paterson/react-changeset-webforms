import compileMarkdown from './compile-markdown.js';

import fs from 'fs';
const filePath = '/home/paddy/development/ember-addons/react-changeset-webforms/test-app/markdown/index-copy.md';
const file = fs.readFileSync(filePath, 'utf-8');
// console.log(file);
const html = compileMarkdown(file);
// console.log('html', html);

const imports = [];

if (html.includes('<DocsDemo')) {
  imports.push(`import DocsDemo from '../docs-utils/DocsDemo';`);
}
if (html.includes('<DocsSnippet')) {
  imports.push(`import DocsSnippet from '../docs-utils/DocsSnippet';`);
}
const componentName = filePath
  .split('/')
  .slice(-1)[0]
  .replace('.md', '')
  .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
const wrapper = `${imports.join('\n')};

export default function ${componentName}() {
  return (
    <>
      {inner}
    </>
  );
}`;

const final = wrapper.replace('{inner}', html);
console.log('final', final);
fs.writeFileSync(filePath.replace('test-app/markdown/', 'test-app/src/components/docs/').replace('.md', '.jsx'), final);
