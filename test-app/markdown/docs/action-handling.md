# Action handling

React Changeset Webforms aims to be as flexible and customisable as possible. For this reason, it allows you to pass action callbacks to several properties of the `ChangesetWebform` component, so that you can cusatomise the behaviour of your web form.

## `afterGenerateChangesetWebform` action

Called when the `changesetWebform` class instance is created, which occues as soon as the component is intersted into the DOM.

Arguments: (`changesetWebform`)

An example of where this can be useful is setting `changesetWebform` as a property on the parent component, thus allowing you top do things like set the value of a field, validate fields, or submit the form, in response to an event that happens outside of the `ChangesetWebform` component.

## `afterFieldInserted` action

Called after an invividual form field is inserted into the DOM.

Arguments: (`formField`, `changesetWebform`)

A field is inserted when the `CWFC` is loaded for the first time, and also where an individual field is included, either explicitly or dynamically, after having been omitted. See <LinkTo @route="docs.hiding-and-showing-fields">Hiding and showing fields</LinkTo> for more details.

## `onFieldValueChange` action

Called whenever the value of a field is updated, via the `updateValue` method.

Arguments: (`formField`, `changesetWebform`)

## `afterFieldRemoved` action

Called after an invividual form field is removed from the DOM.

Arguments: (`formField`, `changesetWebform`)

A field will be removed from the DOM when it is omitted fropm the form, either explicitly or dynamically. See <LinkTo @route="docs.hiding-and-showing-fields">Hiding and showing fields</LinkTo>

## `afterFieldValidation` action

called after an individual field is validated.

Arguments: (`formField`, `changesetWebform`, `validationResult`)

## `onUserInteraction` action

Called when a user interacts with a form field in any way.

Arguments: (`formField`, `changesetWebform`, `eventName`, `fieldValue`, `browserEvent`)

The `eventName` argument is simply a string that is used to namespace the type of user interaction, and is not based on actual browser event types.

The `browserEvent` argument is the actual browser event object, and is only included where it exists.

## `beforeResetForm` action

Called after the user clicks the "Reset form" button, but before the form is reset.

Arguments: (`changesetWebform`)

## `afterResetForm` action

Called after the form is reset in response to the user clicking the "Reset form" button.

Arguments: (`changesetWebform`)

## `beforeClearForm` action

Called after the user clicks the "Clear form" button, but before the form is cleared.

Arguments: (`changesetWebform`)

## `afterClearForm` action

Called after the form is cleared in response to the user clicking the "Clear form" button.

Arguments: (`changesetWebform`)

## `submitData` action

Called after the form has been preflighted, in response to the user clicking "Submit". See <LinkTo @route="docs.form-submission">Form submission</LinkTo> for details on what preflighting does.

Arguments: (`data`, `changesetWebform`)

The `submitData` callback is where you use the data that comes out of the `CWFC` when the form is submitted. This is where you can submit the data to the server, if that is required.

It should also return the result of that call so that the form knows when the call resolves. This allows it to:

- set `formSettings.requestInFlight` to false, allowing request in flight UX to update.
- call the appropriate `submitSuccess` or `submitError` callback, if they have been passed to the component.

### Where `submitData` is not required

In some cases, the `@data` prop passed to the `CWFC` may have it's own `save()` method which will initiate a server call with the form data.

An example is where `@data` is an Ember Data model. The internal behaviour of the `CWFC` is to call `changeset.save()` which [will proxy to the underlying object's save method](https://github.com/adopted-ember-addons/ember-changeset?tab=readme-ov-file#save), if it exists.

When the `save()` method is called on the Ember Data model, a `PATCH` request will automatically be made to the relevant endpoint, and `submitData` is not necessary.

## `afterValidateFields` action

All fields are automatically validated during preflighting when the form is submitted. The `afterValidateFields` callback is called after this occues, but before the changeset data is updated in preflighting. An example of how the data is updated, is that any changeset property is set to null if the corresponding form field is omitted. See <LinkTo @route="docs.hiding-and-showing-fields">Hiding and showing fields</LinkTo> for more details.

Arguments: (`changesetWebform`)

## `beforeSubmitForm` action

Called after a form has been preflighted and passed validation, in response to the `submit()` method being called on the `changesetWebform` class instance, usually when the user clicks the submit button.

Arguments: (`changesetWebform`)

Called before:

- `changesetWebform.formSettings.requestInFlight` is set to `true`
- the `save()` method is called on the underlying changeset
- the `submitData` callback is called, if it has been passed.

## `submitSuccess` action

Called after the form has been successfully submitted.

Arguments: (`successServerResponse`, `changesetWebform`)

The form has been successfully submitted where:

- A success response is returned from the `submitData` callback.
- A success response is returned from the underlying objects `save()` method, where `submitData` is not passed.

## `submitError` action

Called after an attempt to submit the form has failed.

Arguments: (`errorServerResponse`, `changesetWebform`)

An attempt to submit the form has failed where:

- An error response is returned from the `submitData` callback.
- An error response is returned from the underlying objects `save()` method, where `submitData` is not passed.

## `onFormSubmit` action

Called when the `submit` method on the `changesetWebform` class instance is called. This is usually when user clicks the submit button, but could also be initiated from outside of the form.

Arguments: (`changesetWebform`, `componentArgs`)

If this callback is passed, it will completely replace the default submit behaviour of the `CWFC`. See <LinkTo @route="docs.form-submission">Custom form submission</LinkTo> for a more detailed example.

Note that `afterValidateFields`, `beforeSubmitForm`, `submitForm`, `submitSuccess` and `submitError` will no longer be automatically called if `onFormSubmit` is passed. Your `onFormSubmit` function would need to call these callbacks if you still want to use them.
