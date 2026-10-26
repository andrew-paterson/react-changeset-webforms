import AppWideFieldSettingsOverriddenDemo from '../components/demos/AppWideFieldSettingsOverriddenDemo.jsx';
import AttrFunctionsDemo from '../components/demos/AttrFunctionsDemo.jsx';
import FieldSettingsOverriddenDemo from '../components/demos/FieldSettingsOverriddenDemo.jsx';
import FieldSpecificClassSettingsDemo from '../components/demos/FieldSpecificClassSettingsDemo.jsx';
import FieldTypeWithinFormSettingsDemo from '../components/demos/FieldTypeWithinFormSettingsDemo.jsx';
import FormWideClassSettingsDemo from '../components/demos/FormWideClassSettingsDemo.jsx';
import InheritClassSettingsDemo from '../components/demos/InheritClassSettingsDemo.jsx';
import OverrideClassSettingsDemo from '../components/demos/OverrideClassSettingsDemo.jsx';
import ValidationClassSettingsDemo from '../components/demos/ValidationClassSettingsDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';
import { Link } from 'react-router-dom';

# Manipulating element class names and attrs

## The `attrs-from-config` hook

TODO

Note that:

- the `inputElement` namespace is applied to both input element,
- the `inputField` namespace is only applied to the input element in the built in <Link to="/docs/input">Input field</Link>,
- the `powerDatePickerTimeSelectorInput` namespace is only applied to the input elements in the built in <Link to="/docs/power-datepicker">Power Datepicker field</Link>.

This means that configuration using the `inputElement` namespace will affect both of the above inputs. Conversely, configuration using the `inputField` namespace will only apply to the input element in the Input field.

Using these namespaces, we can configure the class names that should be added to the rendered element, or use functions to manipulate the rendered element directly. This is done via the `attrsFromConfig` object, which can have two properties, `classNames` and `attrFunctions`.

Both `classNames` and `attrFunctions` are objects whose keys refer to the namespaces passed to the `attrs-from-config` modifier.

```javascript
attrsFromConfig: {
  classNames: {
    inputElement: ['input', 'padding-s'], // Will replace the inherited value of classNames.inputElement
    inputField: ['$inherited', '$validationClassNames', '$validationPseudoClasses', 'input-field'] // Will merge with the inherited value of classNames.inputElement, because `$inherited` is included.
  }
  attrFunctions: {
    inputElement(element, changesetWebform, formField, _classNameSettings) { // Will always replace the inherted value of attrFunctions.inputElement
      if (formField.fieldType === 'email') {
        element.classList.add('email-input');
      }
    }
  }
}
```

### Debug mode

Switichig on debuig mode in general config, or for a specific instance of a `ChangesetWebform` component, will show the namespaces applied to the various elements in the DOM as class names. This allows you to easily determine which namespace should be used to manipulate the class names or other attrinutes of an element.

See <Link to="/docs/debug-mode">the debug mode docs</Link> for more.

## Default config

The addon implements defaults which can be found in the `attrsFromConfig` object at `./utils/addon-defaults.js`, shown in the snippet below.

<DocsSnippet name="default-attrs-from-config.js" title="Default attrsFromConfig object" />

## Overriding default config

In order to override these defaults, an `attrsFromConfig` object can included in the following places, listed in order of specificity.

1. **[App level configuration](#1-app-level-configuration)** - `changesetWebformsDefaults.attrsFromConfig` in `services/ember-changeset-webforms.js` (Applied throuought the app wide config)
2. **[App level configuration - field type specific](#2-app-level-configuration-field-type-specific)** - Any of the field types `changesetWebformsDefaults.fieldTypes` in `services/ember-changeset-webforms.js` (Applied throuought the app wide config)
3. **[Form level configuration](#3-form-level-configuration)** - `@formSchema.attrsFromConfig` (Applied to a specific instance of a `ChangesetWebform` component)
4. **[Form level configuration - field type specific](#4-form-level-configuration-field-type-specific)** - Any of the field types defined in `@formSchema.fieldSettings.fieldTypes` (Applied to all fields with the specified `fieldType`, within specific instance of a `ChangesetWebform` component)
5. **[Field level configuration](#5-field-level-configuration)** - `field.attrsFromConfig` where field is the definition of a specidfic field in `@formSchema.fields`.

At each level, the merged value of `attrsFromConfig` will be inherited, so you only need to include config for the namespaces that you would like to override.

## Examples

### 1. App level configuration

The example below shows how to the `ember-changeset-webforms` service can be used to add the class name `app-wide-label-element-class` to all label elements throughout the app.

<AppWideFieldSettingsOverriddenDemo />

### 2. App level configuration - field type specific

The example below shows how the `ember-changeset-webforms` service can be used to add the class name `app-wide-radio-button-group-label-element-class` to all label elements within fields with type `radioButtonGroup` throughout the app.

Thus, the class name is added to all radio option labels throughout the app.

<FieldSettingsOverriddenDemo />

The {{this.fieldTypes.length}} built in fields have the following `fieldTypes`:

<ul> 
{{#each this.fieldTypes as |fieldType|}}
<li><code>{{fieldType}}</code></li>
{{/each}}
</ul>

### 3. Form level configuration

The example below show how the `attrsFromConfig` property of a formSchema can be used to add the class name `form-wide-label-class` to all labels throughout one instance of a `ChangesetWebform` component.

<FormWideClassSettingsDemo />

### 4. Form level configuration - field type specific

The example below show how the `attrsFromConfig` property of a specific field type in `formSchema.formSettings.fieldTypes` can be used to add the class name `form-wide-radio-button-label-el-class` to all label elements within fields with type `radioButtonGroup` throughout one instance of a `ChangesetWebform` component.

<FieldTypeWithinFormSettingsDemo />

### 5. Field level configuration

The example below shows:

- how the `attrsFromConfig` property of the `name` field can be used to add the class name `class-for-the-field-label-of-this-field` to the field label for that field,
- how the `attrsFromConfig` property of the `radioButtons1` field can be used to add the class name `class-for-all-label-els-in-this-field` to the field label for that field.

<FieldSpecificClassSettingsDemo />

## Special `classNames` values

The class names `$inherited`, `$validationClassNames` and `$validationPseudoClasses` have special meanings, outlined below. They will never be included in a final listed of class names on a browser element.

### Inheriting vs overriding class names settings from higher levels

Include `$inherited` in the array of class names for an element as a placeholder for the class names inherited from the next level up.

<InheritClassSettingsDemo />

Alternatively, exclude `$inherited` in order to completely override the value.

Note that the class `form-label` is still included. This is because it is included via the `fieldLabel` property, and it is the `labelElement` property which has been overridden.

<OverrideClassSettingsDemo />

### Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `$validationClassNames` as an class name for any element which should receive those class names.

<ValidationClassSettingsDemo />

### Enabling the :valid and :invalid pseudo classes with `$validationPseudoClasses`

If `$validationPseudoClasses` is one of the items in the array of class names, _and_ the element in question is a form element, then the `data-set-custom-validity` attribute will set to `true` on the element.

As a result, whenever the field is validated, all elements within that field with `data-set-custom-validity=true` will have their [`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) method called with any validation errors. This allows the browser to add the `:valid` or `:invalid` pseudo classes to the elements as appropriate.

TODO add code that shows class names in the DOM.

[//]: # "NOTE: the ShowClasses component is rendered once, outside of this page's docs-md wrapper div, at the very bottom of the page - see src/pages/ManipulatingElementClassNamesAndAttrs.jsx - since it needs to observe the whole rendered page's DOM. It is intentionally not inserted here via a Demos:: tag, and this page is not part of the live virtual:docs-pages set."

## Manipulting DOM attrs with a function

If you would one or more class names for an element to be dynamic, you can add a method to the `classNames` object to manipulate the final array of class names for a particular class name property.

The name of the method should be the the property name with `Fn` appended. For example the methos at `classNames.submitButtonFn` will be applied to the classes for the `submitButton` property. It must return an array of strings.

- `element` =: the DOM element
- `changesetWebform` =: the changesetWebform instance.
- `formField` =: the relevant form field object, where the relevant element is within a form field.
- `classNameSettings` =: the merged class name settings as they apply to an instance of changesetWebform or a form field.

The example below removes the class `btn-primary` adds the class `btn-success` to the submit button if `formSettings.requestInFlight` is true. This results in a green background.

Note that what you return from the method will completely override the class name settings for the property.

If you would like to keep those classes, then always include the contents of the first argument (`classNamesArray`) in the response.

The method will be run each time the `class-names-from-config` helper is instered or updated in the relevant template. As it receives `changesetWebform` and `formField` as arguments, this will occur whenever a getter or tracked property is updated on opne of those to class instances.

<AttrFunctionsDemo />
