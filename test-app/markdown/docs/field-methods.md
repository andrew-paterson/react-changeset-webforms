# Field methods

## `validate`

Arguments: (`opts`)

Validates the field if it is not omitted (See [Hiding and showing fields](/docs/hiding-and-showing-fields)).

<Demos::FieldMethodsExampleOne />

If you would like to only revalidate fields which have already been validated, set `opts.skipUnvalidated` to `true`.

<Demos::FieldMethodsExampleTwo />

## `setOmission`

Allows you to updated whether the field is omitted by passing a boolean value.

See [/docs/hiding-and-showing-fields#the-setomission-method](/docs/hiding-and-showing-fields#the-setomission-method).

<Demos::FieldMethodsExampleThree />

## `updateValue`

Arguments: (`value`)

Updates the value of the field.

The `value` argument is the value to update the field to.

<Demos::FieldMethodsExampleFour />

## `reset`

Discards any unsaved changes to the field's value, and unvalidates the field.

<Demos::FieldMethodsExampleSix />

## `pushErrors`

Allows you to push errors onto a field. This will force the field to show the error and display as invalid in the UI.

<Demos::FieldMethodsExampleSeven />
