# Hiding and showing fields

## Explicit field omission

### The `setFieldOmission` method

This is a method of the `changesetWebform` class.

Sets a fields `omitted` property to `true`. It receives a single argument, the `fieldId` of the field to update.

Setting `omitted` to `true` on a fields has several implications:

- the related changeset property will not be validated when the `validateFields` method is run on submit, or in an action.
- the fields HTML element will be removed from the DOM entirely.
- the related data property will not be included in the data which is sent with the submit action.
- if the field's `resetWhenOmitted` property is true (Which is the default) the field will be reset. This means that any unsaved chnages to the field's changeset property will be rolled back using `changeset.rollback()` and the field will be unvalidated.

See the below example of using `includeField` and `omitField`.

<Demos::HiddenFieldsExampleOne />

### The `setOmission` method

This is a method of the `formField` class.

The effect is exactly the same as with using the `setFieldOmission` method of a `changesetWebform` class instance above. This method simply offers an alternative way to achieve the same thing.

<Demos::HiddenFieldsExampleFive />

## Dynamic field omission

It may not be convenient to use action handlers to forcibly show and hide fields in this scenario, so your field schema can define general conditions under which it should be shown or omitted. This is done using the `omitted` property.

### The omitted property

In order to enable dynamic field omission, the `omitted` property of a form field must be an object with three required properties.

- `returns`
  - Boolean. The value to set field omission to if the `where` property evaluates as `true`. Note that if the `where` property evaluates as `false`, the field omission will be set to the opposite of the `returns` value.
- `where`
  - either `anyConditionsTrue` or `allConditionsTrue`. If `allConditionsTrue`, then `where` will evaluate to `true` if every condition in the conditions array evaluates to `true`. If `anyConditionsTrue` then `where` will evaluate to `true` if at least one condition in the conditions array evaluates to `true`.
- `conditions`
  - an array of objects each specifiying a `fieldId` and `valueEquals`. The condition evaluates to true if the current value of the related field matches that of `valueEquals`.

```javascript
fieldId: 'chooseSeat',
omitted: {
  returns: false,
  where: 'allConditionsTrue',
  conditions: [
    {
      fieldId: 'isMember',
      valueEquals: 'Yes',
    },
    {
      fieldId: 'hasTicket'
      valueEquals: 'Yes'
    }
  ],
},
```

Let's consider the `omitted` property in relation to the snippet above.

First, `returns` is `false`, and `where` is `allConditionsTrue`.

- This means that if every item in the `conditions` array evaluates to `true`, the field with a `fieldId` of `chooseSeat` will not be omitted.
  - This only occurs if:
    - the field with a `fieldId` of `isMember` has a value of **Yes**, _and_
    - the field with a `fieldId` of `hasTicket` has a value of **Yes**.
- This also means that if any item in the `conditions` array evaluates to `false` the field with a `fieldId` of `chooseSeat` will be omitted.
  - This occurs if:
    - the field with a `fieldId` of `isMember` does not have a value of **Yes**, _or_
    - the field with a `fieldId` of `hasTicket` does not have a value of **Yes**.

The live example below shows the `mealOption` field being omitted or not, based on the value of the `mealRequired` field.

<Demos::HiddenFieldsExampleTwo />

### Extending the dynamic field omission API

By default, objects in the `conditions` array can only include `valueEquals` along with `fieldId` as properties.

If you need extend this API to include comparisions other than exact string match, you can do so by passing a hash of additional methods to the `ChangesetWebform` component as the `@dynamicIncludeExcludeConditions` property.

Each method receives `value` and `condition` as arguments, and should return a truthy value.

- `value` is the current value of the field with the `fieldId` specified it the condition.
- `condition` is the relevant condition specified.

Now, any conditions in then `dynamicOmission` property of your field schema can use the names of any of these methods as a key, with the value to compare to.

In the example below, we add and invoke the `valueDoesNotEqual` method.

<Demos::HiddenFieldsExampleThree />

### Nested dynamic omission rules

Conditions can also be nested.

Any item in the `conditions` array of a ruleset can itself be a ruleset.

The example below shows howe the second condition on the `anyConditionsTrue` ruleset is itself an `allConditionsTrue` ruleset.

<Demos::HiddenFieldsExampleFour />
