import Link from 'next/link'; export default function DebugMode() {
#  Debug mode
Debug mode can be switched globally, by setting{' '}`debug = true` in the{' '}`services/ember-changeset-webforms.js`.
It can also be switched on for a single instance of the{' '}`ChangesetWebform` component by passing{' '}`@debug=` to the component.
When debug mode is on for any instance of the{' '}`ChangesetWebform` component, the underlying{' '}`changesetWebform` object will be logged to the console when it has been created.
This object contains all of the data that underpins the relevant webform.
Thse debugging classes assist with configuring class names of the various elements in your webforms. See{' '} docs.manipulating-element-class-names-and-attrs{' '} for more.
Here is a quick overview. In various places, you can configure class names via the`classNames` object.
For example, at the lowest level this can be added to a formField invocation in a form schema like this:

```
&#123;fieldId:{' '}&#x27;myField&#x27;, ...classNames: &#123;labelElement: [ &#x27;field-label-element-class&#x27; ],fieldLabel: [&#x27;form-label&#x27;] &#125;
```
With debug mode on, you will see{' '}`[$DEBUG=:configNameSpace===***]` classes added to various elements. The value of *** indicates the name of the property in the{' '}`classNames` that was used to invoke the class names which follow it.
` Phone number`The example above would tell us that

-  The class`field-label-element-class` is added via{' '}`classNames.labelElement` property.
-  The class`form-label` is added via the{' '}`classNames.fieldLabel` property.
This also tell us the name of the property in`classNames`{' '} we need to use to add class names to a particular element in the DOM.