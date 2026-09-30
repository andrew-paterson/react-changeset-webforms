import SingleCheckboxExampleOneDemo from '../../../../components/demos/SingleCheckboxExampleOneDemo.jsx'; import SingleCheckboxExampleTwoDemo from '../../../../components/demos/SingleCheckboxExampleTwoDemo.jsx'; import SingleCheckboxExampleThreeDemo from '../../../../components/demos/SingleCheckboxExampleThreeDemo.jsx'; import { DocsSnippet } from '../../../../components/docs-utils'; export default function SingleCheckbox() {
#  Single checkbox
Renders a single checkbox with a label.
The field ID is set to`true` or`false`{' '} depending on whether the checkbox is checked or not.
The above props are in addition to the generic field props shown with their default values below.
You can also pass a markdown string to the{' '}`checkboxLabelMarkdown` prop. This will be rendered as HTML inside a`label` element.
You can use a custom component for the checkbox label by passing{' '}`checkBoxLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
The object passed must take the following form.
` &#123; componentClass: // Class, required. The imported class of the component to render. props: // Object, optional. This object that will be passed to the component as "props" &#125;`
-  The component template will have access to the`` boolean as well as the`` hash which includes the{' '}`label` and`key` props for that option.
-  Accessibility features Set`for=` on the label element, to ensure that the browser knows which checkbox the label is for.
-  Set`id=` so that the`aria-labelledby`{' '} attribute on the checkbox works correctly.