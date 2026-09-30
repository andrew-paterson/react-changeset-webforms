import { DocsSnippet } from '../../../../components/docs-utils'; export default function TestHelpers() {
#  Test helpers
Determines whether or not a field has been validated, by checking if the expected UI conditions for a valid or invalid field are present.
First, import ther helper.

```
import &#123; wasValidated &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`wasValidated` helper receives two arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a form field in the DOM, or the DOM element itself.
`opts`
- Required
-  The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in"Example opts hash" below.
Example usage{' '}
Determines whether or not all the fields in a set have been validated, by checking if the expected UI conditions for a valid or invalid field are present for each one.
First, import the helper.

```
// Importimport &#123; allValidated &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`allValidated` helper receives three arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a set or form fields or cloned fields in the DOM, or the DOM elements themselves.
`opts`
- Required
-  The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in"Example opts hash" below.
`indexes`
- Optional
-  the indexes from the set of elements to check. If not passed, all elements in the set will be checked.
Example usage{' '}
This example checks that the 1st, 2nd, 4th, 5th and 6th elements in the set returned by the selector{' '}` $&#123;testEls.clonableFieldWithData&#125; $&#123;els.cwfCloneWrapper&#125;`{' '} have all been validated.
Determines whether or not all the fields in a set have not been validated, by checking that the expected UI conditions for a valid or invalid field are not present for each one.
First, import the helper.

```
// Importimport &#123; noneValidated &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`noneValidated` helper receives three arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a set or form fields or cloned fields in the DOM, or the DOM elements themselves.
`opts`
- Required
-  The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in"Example opts hash" below.
`indexes`
- Optional
-  the indexes from the set of elements to check. If not passed, all elements in the set will be checked.
Example usage{' '}
This example checks that the 1st and second elements in the set returned by the selector{' '}` $&#123;testEls.clonableFieldBasics&#125; $&#123;els.cwfCloneWrapper&#125;`{' '} have all been validated.
Returns`true` if the field UI satisfies the conditions for a field which has passed validation. The conditions checked are:

- the field element does not contain any error messages,
-  the field elements which should have the validation class names have the class names for a valid field,
-  the field elements which should have the validation class names do not have the class names for an invalid field,
-  the field elements which should have the border colour for a valid element (if any) do have that border colour,
-  the field elements which should have the background colour for a valid element (if any) do have that border colour,
-  the field element which should have background image property of a valid field (if any) does have it.
The function needs to know what values to check for each condition, adn which elements should have them. Thus we pass it an options hash as the third argument. The availablke props are shown in the example below.{' '}
Note that the above options work with the addon defaults, which are based on Bootstrap styling.{' '}
Note that`validBorderColour`,{' '}`invalidBorderColour`,`validBackgroundColour`,{' '}`invalidBackgroundColour`,{' '}`validBackgroundImage`, and{' '}`invalidBackgroundImage` are not required. If absent, they will not be checked.
The`passedValidation` helper received four arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a form field in the DOM, or the DOM element itself.
`opts`
- Required
-  SeeExample opts hash above
`assert`
- Optional
-  The assert funciton from the test function. If present, the function will create an assertion for each check.
`assertionSuffix`
- Optional
-  Only relevant if the assert argument is included. A string to append to the end of the assertions created.
First, import the helper. In this example, we also import the default options hash to pass as the second argument. In practice these options can be defined anywhere.

```
import &#123; passedValidation &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;import{' '} validationTestHelpersDefaultsfrom{' '} &#x27;ember-changeset-webforms/test-support/validation-test-helpers-defaults&#x27; ;
```
Examples
Returns`true` if the field UI satisfies the conditions for a field which has failed validation. The conditions checked are:

- the field element does contain any error messages,
-  the field elements which should have the validation class names have the class names for an invalid field,
-  the field elements which should have the validation class names do not have the class names for a valid field,
-  the field elements which should have the border colour for an invalid element (if any) do have that border colour,
-  the field elements which should have the background colour for an invalid element (if any) do have that border colour,
-  the field element which should have background image property of an invalid field (if any) does have it.
The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in the example below.{' '}
Note that the above options work with the addon defaults, which are based on Bootstrap styling.{' '}
Note that`validBorderColour`,{' '}`invalidBorderColour`,`validBackgroundColour`,{' '}`invalidBackgroundColour`,{' '}`validBackgroundImage`, and{' '}`invalidBackgroundImage` are not required. If absent, they will not be checked.
The`failedValidation` helper receives four arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a form field in the DOM, or the DOM element itself.
`opts`
- Required
-  SeeExample opts hash above
`assert`
- Optional
-  The assert function from the test function. If present, the function will create an assertion for each check.
`assertionSuffix`
- Optional
-  Only relevant if the assert argument is included. A string to append to the end of the assertions created.
First, import the helper. In this example, we also import the default options hash to pass as the second argument. In practice these options can be defined anywhere.

```
import &#123; failedValidation &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;import{' '} validationTestHelpersDefaultsfrom{' '} &#x27;ember-changeset-webforms/test-support/validation-test-helpers-defaults&#x27; ;
```
Examples
Determines whether or not all the fields in a set have passed validation, by checking if the expected UI conditions for a valid field are present for each one.
First, import the helper.

```
// Importimport &#123; allPassedValidation &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`allPassedValidation` helper receives three arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a set or form fields or cloned fields in the DOM, or the DOM elements themselves.
`opts`
- Required
-  The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in"Example opts hash" below.
`indexes`
- Optional
-  the indexes from the set of elements to check. If not passed, all elements in the set will be checked.
Example usage{' '}
This example checks that the 4th, 5th and 6th elements in the set returned by the selector{' '}` $&#123;testEls.clonableFieldWithData&#125; $&#123;els.cwfCloneWrapper&#125;`{' '} have all passed validation.
Determines whether or not all the fields in a set have failed validation, by checking if the expected UI conditions for a invalid field are present for each one.
First, import the helper.

```
// Importimport &#123; allFailedValidation &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`allFailedValidation` helper receives three arguments

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a set or form fields or cloned fields in the DOM, or the DOM elements themselves.
`opts`
- Required
-  The function needs to know what values to check for each condition, and which elements should have them. Thus we pass it an options hash as the second argument. The available props are shown in"Example opts hash" below.
`indexes`
- Optional
-  the indexes from the set of elements to check. If not passed, all elements in the set will be checked.
Example usage{' '}
This example checks that the 1st and 2nd elements in the set returned by the selector{' '}` $&#123;testEls.clonableFieldWithData&#125; $&#123;els.cwfCloneWrapper&#125;`{' '} have all failed validation.
Removes specified cloned field elements by clicking their remove buttons in the DOM.
First, import the helper.

```
// Importimport &#123; removeClones &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`removeClones` helper receives two arguments
`identifier`{' '}

- Required{' '}
-  The`identifier` argument can either be the selector of a DOM element which contains cloned fields, or the DOM element itself.
`indexes`

- Optional
-  the indexes from the set of clones found inside the identifier element to remove. If not passed, all clones in the set will be removed.
Example
Adds a clone in a cloned form field by clicking the add clone button in the DOM.
First, import the helper.

```
// Importimport &#123; addClone &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`addClone` helper receives one argument
`identifier`{' '}

- Required{' '}
-  The`identifier` argument can either be the selector of a clonable form field in the DOM, or the DOM element itself.
Example
First, import the helper.

```
// Importimport &#123; clickSubmitButton &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`clickSubmitButton` helper receives one argument
`identifier`{' '}

- Required{' '}
-  The`identifier` argument can either be the selector of a clonable form field in the DOM, or the DOM element itself.
Example
Analyses a`ChangesetWebform` component is it is currently rendered in the DOM, and returns an object which describes the fields, including their current values and validation statuses.{' '}
First, import the helper.

```
// Importimport &#123; changesetWebformStateAsJSON &#125;{' '}from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ;
```
The`changesetWebformStateAsJSON` helper receives one argument

- `identifier`{' '}Required{' '}
-  The`identifier` argument can either be the selector of a`ChangesetWebform` form element in the DOM, or the DOM element itself.
Example
Retrieves the text content of all field errors from the DOM, and returns an array of stings.
First, import the helper.

```
// importimport &#123; fieldErrorText &#125;from{' '} &#x27;ember-changeset-webforms/test-support/helpers&#x27; ; onst errors ={' '}fieldErrorText(identifier)
```
The`identifier` argument can either be the selector of an element of a form field in the DOM, or the which contains the field errors, or a DOM element which contains the field errors.