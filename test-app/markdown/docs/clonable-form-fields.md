# Clonable form fields

A clonable form field allows the user to add and remove instances of a field. The example below allows a user to add multiple emails. When the form is submitted, the value of the clonable form field will be an array of values.

To make a field clonable, the `fieldType` property must be set to `clone-group`, and a `cloneFieldSchema` property must be included as well.

Apart from the above properties, a clone group can have all the same settings and validations as any other field.

The `cloneFieldSchema` property behaves exactly as the field Schema on any other field. It is self contained and can have any of the settings, validation rules, and validation events that any other field can have.

The following default field settings can also be overridden:

<DocsSnippet @name="clone-group-field-options.js" @title="Available options for clonable fields" />

## Adding and removing clones

A clone group field can have `minClones` and `maxClones` properties- integers specifying the minimum and maximum number of clones allowed.

Where the number of clones is less than `maxClones` an "Add clone" button will be displayed.

Where the number of clones is greater than `minClones`, a remove clone button will display with each clone.

## Example 1

The example below allows the user to add email addresses, with a minimum of 2 and a maximum of 4.

<Demos::CloneGroupForm />

## Example 2 - with preloaded data

The data object passed to the `ChangesetWebform` component may pass an array of values for a clonable field, as below.

Note that null values are permitted.

Note also that if the array is longer than the `maxClones` setting, the clonable field will still show one clone for each item in the array, and this will not automatically fail validation.

In order to validate on the length of the array, add the `validateLength` validation rule to the `clone-group` field as shown in the component JS in the example below. Note that the validation for the clone group displays below the field label. Clicking submit below will result in the length validation error showing under the main field label.

<Demos::CloneGroupFormWithData />

Note that when the array of data passed to a `clone-group` field is longer than the `maxClones` setting, the component will still insert one clone for each item in the array. In this case, the add clone button will not be available until the user has removed clones until the total is less than the `maxClones` setting.

## Validation notes

Note that there is an additional built in validator specifically for use in a clonedFieldSchema- `uniqueClone`. See usage in the above example. This validation rule checks that each clone is unique.

See [https://github.com/poteto/ember-changeset-validations#overriding-validation-messages](https://github.com/poteto/ember-changeset-validations#overriding-validation-messages) on how to override validation messages, while retaining dynamic values.

## Clone field labels

### Defaults (where not set)

The `fieldLabel` property is not required for a `cloneFieldSchema`. If not set, it will default tot he `fieldLabel` of the parent form field, witht beh index of the clone appended.

Note that when not set, the `placeholder` property be the same as `fieldLabel`.

Set `hideLabel` to true on the `cloneFieldSchema` if you don't want the label to show.

<Demos::CloneGroupFormNoFieldLabel />

### `fieldLabel` and `placeholder` strings

If a string is passed for `cloneFieldSchema.fieldLabel`, each clone will have a `fieldLabel` which begins with that string and than has its current index appended. The same applies to `placeholder`.

<Demos::CloneGroupFormStringFieldLabel />

### `fieldLabel` and `placeholder` functions

If a function is passed for `cloneFieldSchema.fieldLabel`, each clone will have a `fieldLabel` is the string returned from that function.

The function receives a single argument, whiich is the the class instance of the relevant clone.

The same applies to `placeholder`.

<Demos::CloneGroupFormCustomLabelsAndPlaceholders />
