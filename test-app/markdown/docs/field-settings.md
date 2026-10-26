import FieldSettingsCustomParserDemo from '../components/demos/FieldSettingsCustomParserDemo.jsx';
import ClickerExampleTwoFormSchema from '../components/forms/ClickerExampleTwoFormSchema.jsx';
import { DocsSnippet } from '../components/docs-utils';

# Field settings

## Generic field settings

Generic field settings are those which apply to all form fields, regardless of the type of field or the internal markup which is rendered within it.

The default settings are listed below with their values.

Generic field settings can be tweaked for all the fields in one instance of a `changesetWebform` component, in the `fieldSettings` object at the root of your formSchema.

Note that any of these settings can be overridden in one of the field objects in the `formSchema.fields` array.

<DocsSnippet name="generic-field-settings.js" title="Default generic field settings and their values" />

<ClickerExampleTwoFormSchema />

### The `customParser` method

Custom parsers can be used to manipulate field definitions that are passed to the `fields` array in a `formSchema`. The `customParser` method is run at the very end of generating the form field instance, after all defaults have been applied.

It receives a single argument, `field` and must also return the `field`.

You can define a `customParser` method for all fields by adding it to the `changesetWebformsDefaults.fieldSettings` in `utils/app-defaults.js`.

You can also define `customParser` for a specific field type, in the relevant object in `changesetWebformsDefaults.fieldTypes` in `utils/app-defaults.js`.

<FieldSettingsCustomParserDemo />
