import CustomFieldUsageDemo from '../components/demos/CustomFieldUsageDemo.jsx';
import FieldMethodsExampleFiveDemo from '../components/demos/FieldMethodsExampleFiveDemo.jsx';
import ForcingValidationDemo from '../components/demos/ForcingValidationDemo.jsx';
import SignupFormDemo from '../components/demos/SignupFormDemo.jsx';
import ValidationBasicsDemo from '../components/demos/ValidationBasicsDemo.jsx';
import ValidationEventsDemo from '../components/demos/ValidationEventsDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';
import { Link } from 'react-router-dom';

# Field validation

## Integrating validator functions

Validator functions need to be included in an instance of a `ChangesetWebform` component in order for the corresponding validation rules to work. This can be done globally, or for each instance of the component.

### Importing all of the default validators

The full set of default validators shipped by [Ember Changeset Validations](https://github.com/adopted-ember-addons/ember-changeset-validations) can be imported as below.

<DocsSnippet name="import-default-validators.js" title="Importing the default validator functions" />

### Importing a subset of default validators

Note that we can also import a subset of validations, if we don't intend on using all of the default ones, and we'd prefer to avoid importing validators that we don't need.

The snippet below shows the full set of default validators imported in `react-changeset-webforms/src/utils/default-validators` (Used above).
Rather than importing the default validators, we could import a subset of those shown below.

<DocsSnippet name="ember-changeset-validations-default-validators.js" title="The full set of default validators" />

### Importing custom validators

Custom validators can be imported from anywhere. See <Link to="/docs/integrating-custom-validators">Integrating custom validators</Link>

### Integrating validator functions app wide

Validators can be added at the app wide level in `utils/app-defaults.js` as below. We first import the validators in that file as above and then add them to the `validators` property as below.

<DocsSnippet name="app-wide-validators.js" title="Including validators app wide" />

This would result in all of the default validators being available in all instances of the `ChangesetWebform` component throughout our app.

### Integrating validator functions in an individual form

The example component below shows how the custom `phoneNumber` validator can be imported and then made available to a single instance of the `ChangesetWebform` component, by including it in `formSchema.validations`.

Note that if you've specified app wide validators, as in the above example, those will still be available to this instance of the `ChangesetWebform` component. This is why `validatePresence` still works, even though it is not included in `formSchema.validations`.

<CustomFieldUsageDemo />

## Defining validation rules

This addon uses [React Changeset Validations](https://github.com/poteto/react-changeset-validations) to handle validation, and also as its default library of validators.

The [React Changeset Validations usage documentation](https://github.com/poteto/react-changeset-validations#usage) outlines how you create a validation map and then pass that map to the changeset generator, so that the validations are integrated into your changeset.

With **React Changeset Webforms** the importing of the validations library, construction of the validations map and creation of the changeset are handled for you.

You need only specify the validations that you'd like to apply to each field in the `validationRules` array.

Each item in a field's `validationRules` array is an object that must contain a `validationMethod` property, which must correspond to a validation rule in the [Ember Changeset Validations validator api](https://github.com/poteto/ember-changeset-validations#validator-api), or any custom validators that you have written (More on custom validators below).

Each item in a field's `validationRules` array may also include an `arguments` property, where you can pass the arguments relevant to the validator specified by the `validationMethod`.

Thus, the code below taken from the [Ember Changeset Validations usage docs](https://github.com/poteto/ember-changeset-validations#usage) on create a validations map:

```javascript
  firstName: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],
```

would be expressed as the below when defining a formSchema for the changeset-webform component.

```javascript
validationRules: [
  {
    validationMethod: 'validatePresence',
    arguments: true,
  },
  {
    validationMethod: 'validateLength',
    arguments: { min: 4 },
  },
];
```

The example below shows a basic implementation of the `validatePresence`, `validateFormat` and `validateLength` validators.

<ValidationBasicsDemo />

## Validation events

In addition to defining validation rules, we can also configure which events should trigger field validation. The addon provides some sane defaults, so that we don't have to configure obvious validation events over and over.

Note that we're not referring to browser events here, but customised event names which the built in fields send as the first argument to the `onUserInteraction` action, when the user takes the related action.

Validation events are specified in the `validatesOn` property of a field.

### Validation event names for built in fields

The snippet below shows all of the available event names which can be passed to the `validatesOn` array for a field.

Those which are shown under `Included by addon defaults` are included in the `validatesOn` array of the field's definition in addon config.

Such events will trigger validation by default, and do not need to be added to the `validatesOn` array for a field in our app of component config.

Those under `Not included by addon defaults` need to be included in app or component config if we would like them to trigger validation.

TODO InterpolatedSimpleJsSnippet

### Customising validation events for a field

The example below shows three scenrios when defining validation events.

1. The `name` field has no `validatesOn` property, and so the field uses the defaults. Therefore, it validates on `focusOut` but not `keyUp`.
2. The `email` field overrides the `validatesOn` property. Therefore, it only validates on `keyUp` and does not validate on `focusOut`.
3. The `phoneNumber` field adds `keyUp` to the `validatesOn` property. This is achieved by including the srting `$inherited` in the array for `validatesOn`. Therefore, it validates both on `focusOut` and `keyUp`.

<ValidationEventsDemo />

The addon defaults outlined above can be overridden at the app level, or within a particular form schema. See <Link to="/docs/configuration-options">Configuration options</Link>.

### Forcing validation in an action

Under the hood, each field has property called `eventLog`, an array which is populated with the names of all the validation events which have occurred. For example when a user types in an input field, the field's `eventLog` property will have the strings `focusIn`, `keyDown`, and `keyUp` added to it.

If there is any intersection between the `eventLog` and `validatesOn` properties, the field's validation is activated.

The addon defaults include `forceValidation` in a field's `validatesOn` property.

Thus, you can forcibly activate a field's validation by pushing the string `forceValidation` into `field.eventLog`, as shown in terh `updateNameField` action in the example below.

<ForcingValidationDemo />

### Using your own validation event names

The example below shows how you can trigger validation in customised ways by adding an event string to the `validatesOn` array of a field, and then pushing the same string into the `eventLog` array of the field when it should be validated.

In the example below, clicking the "Update value of name field" button updates the value of the name field, and validates the field by pushing the custom event name `valueExternallyUpdated` into `eventLog`. This works because `valueExternallyUpdated` is added to the the `validatesOn` property of the field.

<FieldMethodsExampleFiveDemo />

## Setting custom validity on DOM elements

Browsers will automatically apply the `valid` and `invalid` pseudo classes to form elements where appropriate. For example, if an input field with `type=email` is updated with an invalid email address, the input will then have the `invalid` pseudo class, and will be selectable with `:invalid`.

DOM elements have a built in `setCustomValidity` method

See [https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity)

`data-set-custom-validity`

## Example

<SignupFormDemo />
