import CheckboxGroupExampleOneDemo from '../../../../components/demos/CheckboxGroupExampleOneDemo.jsx'; import CheckboxGroupExampleThreeDemo from '../../../../components/demos/CheckboxGroupExampleThreeDemo.jsx'; import CheckboxGroupExampleTwoDemo from '../../../../components/demos/CheckboxGroupExampleTwoDemo.jsx'; import { DocsSnippet } from '../../../../components/docs-utils'; export default function CheckboxGroup() {
#  Checkbox group
Renders a checkbox group. The value of the field as a whole is an array which will include the value of`key` for each option that is currently selected.
The above props are in addition to the generic field props shown with their default values below.
Each option in the`options` property of field with type`checkboxGroup` can have the following properties.
You can also pass a primitive value, such as a string or number as an option. In this case the option will be expanded into an object in which the values of the`key` and`value` properties will be the same.
The above props are in addition to the generic field props shown with their default values below.
Pass a string of markdown content as`optionLabelmarkdown` and it will be rendered inside the label element for the option.
When using a custom component for option labels, either by:

-  passing`optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
-  by passing`labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override`optionLabelComponent`.
In both cases the following applies, the object passed must take the following form.
`&#123; componentClass: // Class, required. The imported class of the component to render. props: // Object, optional. This object that will be passed to the component as "props" &#125;`
-  The component template will have access to the`` boolean as well as the`` hash which includes the`label`,`key`, and`onlyCheckedOption` props for that option.
-  Accessibility features Set`for=` on the label element, to ensure that the browser knows which checkbox the label is for.
-  Set`id=` so that the`aria-labelledby` attribute on the checkbox works correctly.
The above props are in addition to the generic field props shown with their default values below.