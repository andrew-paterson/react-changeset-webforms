# `changesetWebform` class methods and properties

Every instance of the instance of the ChangesetWebform component is underpinned by an instance of the `changesetWebform` class instance. It has several methods and properties which apply to the form as a whole, outlined below.

Note that the `changesetWebform` class instance is included as an argument in all action callbacks. See [Action handling](docs/action-handling).

## Methods

### `validate`

Arguments: (`opts`)

Validates all fields which are not omitted (See [Hiding and showing fields](/docs/hiding-and-showing-fields)).

<Demos::FormMethodsExampleOne />

If you would like to only revalidate fields which have already been validated, set `opts.skipUnvalidated` to `true`.

<Demos::FormMethodsExampleTwo />

### `setFieldOmission`

Allows you to update whether or not a form field is omitted, by passing the `fieldId` and a boolean value.

See [/docs/hiding-and-showing-fields#the-setfieldomission-method](/docs/hiding-and-showing-fields#the-setfieldomission-method).

<Demos::FormMethodsExampleThree />

### `getField`

Retrives a field int he changesetWebform based on the `fieldId` property.

```javascript
@action
onFieldValueChange(formField, changesetWebform) {
  const emailField = changesetWebform.getField('email'); // The field with `fieldId === 'email'
}
```

### `getData`

Saves the underlying chnageset, and returns the value of `changeset.data`. This is the javascript object whoch represents that collective values of the form fields. It is the data that would be passed to `submitData`.

<Demos::FormMethodsExampleFive />

### `pushErrors`

Allows you to push errors on to any field in the `changesetWebform` object. The example below will do so if the email `taken@example.com` is submitted.

<Demos::FormMethodsExampleSix />

### `clear`

Sets the value of each form field to `null`, and resets the form UI.

#### Clear form callbacks

If an action is passed to the `ChangesetWebform` component as `@beforeClearForm`, it will be called after the clear button is clicked, but before any of the clear form code runs.

Similarly, if an action is passed to the `ChangesetWebform` component as `@afterClearForm`, it will be called after the clear form code has been run.

<Demos::FormMethodsExampleSeven />

### `reset`

Resets the value of each field, and resets the form UI.

It's important to note that under the hood this method runs the `rollback` method on the underlying changeset. This has a few important consequences, outlined below.

1. If a field has an initial value from the `@data` prop passed to the `ChangesetWebform` component, clicking the reset button will reset that field to that initial value. See how, in the example below, the fields are reset to their initial values if they are updated and then ther reset button is clicked.

<Demos::FormMethodsExampleEight />

2. If a field was inserted with `defaultValue`, clicking the reset button will clear that field, because in this case the value has not been saved on the changeset. See how the fields are cleared when the reset button is clicked in the example below.

<Demos::FormMethodsExampleNine />

3. If fields are updated and the `save` method of the underlying changeset is called, then clicking the reset button will reset fields to their values when the chnageset was last saved. The most common instance of this is when the submit button is clicked. See how, in the example above, if the submit button is clicked when the fields have values, then clicking the reset button resets the fields to those values, rather than clearing them.

#### Reset form callbacks

If an action is passed to the `ChangesetWebform` component as `@beforeResetForm`, it will be called after the reset form button is clicked, but before any of the reset form code runs.

Similarly, if an action is passed to the `ChangesetWebform` component as `@afterResetForm`, it will be called after the reset form form code has been run.

## Properties

### hasValidationErrors

Returns `true` if one or more fields have validation errors.

This allows us to ignore fields which have not yet been validated, and check if any of those that have been validated failed validation.

<Demos::FormMethodsExampleTen />

### hasUnvalidatedFields

Returns `true` if there are any fields which have validation rules, but have not yet been validated.

Using `hasUnvalidatedFields` with `hasValidationErrors` allows us to check that all fields with validation rules have validated successfully.

Thus, in the example below, if you click the "Check if all fields have successfully validated" button, while both fields are empty and unvalidated, the alert will show that the form is not valid, but the form itself will not update in any way.

<Demos::FormMethodsExampleFour />
