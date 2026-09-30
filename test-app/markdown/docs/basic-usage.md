# Basic usage

Define your form, including its fields validation rules in object like the one below, and pass this to the `ChangesetWebform` component as the `formSchema` property, and that's it! The form will be rendered and all validation behaviours will work without any further template code.

<Demos::LoginForm />

## Actions

You can pass actions to a instance of a `ChangesetWebform` component, to define behaviours whioch are individual to a particulary ionstance of a form. The most obvious example would be the action that should run whgern the form is submitted, in many cases to submit the data from the form to the server.

The above example also includes a `submitSuccess` and `submitError` which will run when the `submit` action is resolved.

See <LinkTo @route="docs.action-handling">Action handling</LinkTo> for more details.

## Form settings

Every `formSchema` has formSettings object which defines options for the form as a whole.

Note that `formName` is required and no two forms rendered on the same page should have the same name.

In the example above, the following default options are overriden:

- `submitButtonText`
- `hideLabels`
- `clearFormAfterSubmit`

See <LinkTo @route="docs.form-settings">Form settings</LinkTo> for more details.
