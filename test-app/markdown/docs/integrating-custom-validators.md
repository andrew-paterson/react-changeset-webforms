# Integrating custom validators

The [Ember Changeset Validations docs on writing your own validators](https://github.com/poteto/ember-changeset-validations#writing-your-own-validators) outlines how to write your own synchronous or asynchronous validators.

The method for creating custom validators in **React Changeset Webforms** is identical, but in order to use them, you must pass your custom validators to the `ChangesetWebform` component as the `@customValidators` property.

The format of the `@customValidators` property should be a javascript object with a named method for each custom validator that you would like to use in the component.

## Example

The example below shows how to:

1. Define a custom validator named `uniqueness.js` in the `validators` directory of your app.
2. Import your validator into a component and include it in `formSettings.validators`.

<Demos::CustomValidatorsForm />

## Arguments

When defining your custom validator, the single argument to the main function will receive everything in the `arguments` property of the relevant validation rule, defined in the `validationRules` array for the field.

In the example above, the field definitions have an object called `descriptionsMap` passed to the `arguments` property.

```
validationRules: [{
  validationMethod: 'validateUniqueness',
  arguments: {
    descriptionsMap: {
      primaryEmail: 'primary email',
      recoveryEmail: 'recovery email'
    }
  }
}],
```

The corresponding validator function can now access `descriptionsMap` object via `opts.descriptionsMap`.

```javascript
export default function validateUniqueness(opts = {}) {
  console.log(opts)
  // descriptionsMap: {
  //    primaryEmail: 'primary email',
  //    recoveryEmail: 'recovery email'
  // }
  ...
```
