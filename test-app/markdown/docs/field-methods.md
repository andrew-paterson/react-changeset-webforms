import FieldMethodsExampleOneDemo from '../../../../components/demos/FieldMethodsExampleOneDemo.jsx'; import FieldMethodsExampleTwoDemo from '../../../../components/demos/FieldMethodsExampleTwoDemo.jsx'; import FieldMethodsExampleThreeDemo from '../../../../components/demos/FieldMethodsExampleThreeDemo.jsx'; import FieldMethodsExampleFourDemo from '../../../../components/demos/FieldMethodsExampleFourDemo.jsx'; import FieldMethodsExampleSixDemo from '../../../../components/demos/FieldMethodsExampleSixDemo.jsx'; import FieldMethodsExampleSevenDemo from '../../../../components/demos/FieldMethodsExampleSevenDemo.jsx'; export default function FieldMethods() {
#  Field methods
Arguments: (`opts`)
Validates the field if it is not omitted (See{' '}[ Hiding and showing fields](/docs/hiding-and-showing-fields) ).
If you would like to only revalidate fields which have already been validated, set`opts.skipUnvalidated` to`true`.
Allows you to updated whether the field is omitted by passing a boolean value.
See{' '}[ /docs/hiding-and-showing-fields#the-setomission-method](/docs/hiding-and-showing-fields#the-setomission-method) .
Arguments: (`value`)
Updates the value of the field.
The`value` argument is the value to update the field to.
Discards any unsaved changes to the field's value, and unvalidates the field.
Allows you to push errors onto a field. This will force the field to show the error and display as invalid in the UI.