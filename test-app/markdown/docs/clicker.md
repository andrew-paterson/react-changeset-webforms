import ClickerExampleOneFormSchemaDemo from '../components/forms/ClickerExampleOneFormSchemaDemo.jsx';
import ClickerExampleTwoFormSchemaDemo from '../components/forms/ClickerExampleTwoFormSchemaDemo.jsx';

# Clicker

The field displays an element which emits the `onUserInteraction` action with the eventName `click` when clicked. You can bind this to an action in your component and then respond in any way.

The examples below toggle the advanced field in a form.

## Clicker field basic usage

Pass `clickerText` and optionally `clickerElementClassNames`.

Renders a `div` element with `role="button"` the classNames provided. The inner text of the element is what is passed to `clickerText`.

<ClickerExampleOneFormSchemaDemo />

## Clicker field with a custom component

You can use a custom component for the checkbox label by passing `displayComponent` to the field. The component passed will then be rendered in place of the standard clicker component.

The clickable elemnt must call the `@onClick` action, which is passed to it by the `changesetWebform` component. See `Custom clicker component template` int he example below.

The object passed must take the following form.

```
{
  componentClass: // Class, required. The imported class of the component to render.
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

- The component will also have access to an `formField` prop, with the formField object.
- The component can also apply `...attributes` to the element that should receive the class names configured for the `clickerElement` name space.
- The component will also have access to the `changesetWebform` object, which is contains the form settings, form fields and underlying changeset.

Pass `displayComponent` as an object containing:

- `path` - the path to the component to render
- `props`

If using a `button` element in your custom clicker component, bear in mind that the default `type` of a button is `submit`. Thus, if you don't add a type to your button, clicking it will result in a form submission. Setting `type="button"` is recommended.

<ClickerExampleTwoFormSchemaDemo />
