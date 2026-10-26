# Static content field

This field can be used to static content in a form. It has no action handlers.

If static text is sufficient, you can simply use the `text` prop to pass the static text to display, and the `textElement` prop to specify what element the text should be wrapped in.

`textElementClass` can also be set to a string of class names to be added to the text element.

<Demos::StaticContentExampleOne />

## Static content field with custom content component

<Demos::StaticContentExampleTwo />

Alternatively, you can pass `

<DocsSnippet @name="staticContent-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}
