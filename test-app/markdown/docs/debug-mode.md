# Debug mode

Debug mode can be switched globally, by setting `debug = true` in the `services/ember-changeset-webforms.js`.

It can also be switched on for a single instance of the `ChangesetWebform` component by passing `@debug={{true}}` to the component.

## Effects

### The `changesetWebform` object is logged after creation

When debug mode is on for any instance of the `ChangesetWebform` component, the underlying `changesetWebform` object will be logged to the console when it has been created.

This object contains all of the data that underpins the relevant webform.

### `$DEBUG-` classes are added to all elements with configurable class names

Thse debugging classes assist with configuring class names of the various elements in your webforms. See <LinkTo @route="docs.manipulating-element-class-names-and-attrs">docs.manipulating-element-class-names-and-attrs</LinkTo> for more.

Here is a quick overview. In various places, you can configure class names via the `classNames` object.

For example, at the lowest level this can be added to a formField invocation in a form schema like this:

```javascript
{
  fieldId: 'myField',
  ...
  classNames: {
    labelElement: ['field-label-element-class'],
    fieldLabel: ['form-label']
  }
```

With debug mode on, you will see `[$DEBUG=>configNameSpace===***]` classes added to various elements. The value of \*\*\* indicates the name of the property in the `classNames` that was used to invoke the class names which follow it.

```html
<label
  class="[$DEBUG=>configNameSpace===labelElement] field-label-element-class [$DEBUG=>configNameSpace===fieldLabel] form-label"
  ...
>
  Phone number
</label>
```

The example above would tell us that

- The class `field-label-element-class` is added via `classNames.labelElement` property.
- The class `form-label` is added via the `classNames.fieldLabel` property.

This also tell us the name of the property in `classNames` we need to use to add class names to a particular element in the DOM.
