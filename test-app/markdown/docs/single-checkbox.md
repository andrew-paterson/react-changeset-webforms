import SingleCheckboxExampleOneDemo from '../components/demos/SingleCheckboxExampleOneDemo.jsx';
import SingleCheckboxExampleThreeDemo from '../components/demos/SingleCheckboxExampleThreeDemo.jsx';
import SingleCheckboxExampleTwoDemo from '../components/demos/SingleCheckboxExampleTwoDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';

# Single checkbox

Renders a single checkbox with a label.

The field ID is set to `true` or `false` depending on whether the checkbox is checked or not.

## Single checkbox props

<DocsSnippet name="singleCheckbox-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

<DocsSnippet name="generic-field-settings.js" title="Default generic field settings and their values" />

## Single checkbox basic usage

<SingleCheckboxExampleOneDemo />

## Single checkbox markdown checkbox label

You can also pass a markdown string to the `checkboxLabelMarkdown` prop. This will be rendered as HTML inside a `label` element.

<SingleCheckboxExampleTwoDemo />

## Single checkbox custom component for checkbox label

You can use a custom component for the checkbox label by passing `checkBoxLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.

The object passed must take the following form.

```
{
  componentClass: // Class, required. The imported class of the component to render.
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

- The component template will have access to the `{{@checked}}` boolean as well as the `{{@option}}` hash which includes the `label` and `key` props for that option.
- Accessibility features
  - Set `for={{@for}}` on the label element, to ensure that the browser knows which checkbox the label is for.
  - Set `id={{@labelId}}` so that the `aria-labelledby` attribute on the checkbox works correctly.

<SingleCheckboxExampleThreeDemo />
