import CloneGroupFormDemo from '../../../../components/demos/CloneGroupFormDemo.jsx';
import CloneGroupFormWithDataDemo from '../../../../components/demos/CloneGroupFormWithDataDemo.jsx';
import CloneGroupFormNoFieldLabelDemo from '../../../../components/demos/CloneGroupFormNoFieldLabelDemo.jsx';
import CloneGroupFormStringFieldLabelDemo from '../../../../components/demos/CloneGroupFormStringFieldLabelDemo.jsx';
import CloneGroupFormCustomLabelsAndPlaceholdersDemo from '../../../../components/demos/CloneGroupFormCustomLabelsAndPlaceholdersDemo.jsx';
import { DocsSnippet } from '../../../../components/docs-utils';

export default function ClonableFormFields() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="clonable-form-fields"
          class="docs-md__h1"
        >
          Clonable form fields
        </h1>
        <p>A clonable form field allows the user to add and remove instances of a field. The example below allows a user to add multiple emails. When the form is submitted, the value of the clonable form field will be an array of values.</p>
        <p>
          To make a field clonable, the <code>fieldType</code> property must be set to <code>clone-group</code>, and a <code>cloneFieldSchema</code> property must be included as well.
        </p>
        <p>Apart from the above properties, a clone group can have all the same settings and validations as any other field.</p>
        <p>
          The <code>cloneFieldSchema</code> property behaves exactly as the field Schema on any other field. It is self contained and can have any of the settings, validation rules, and validation events that any other field can have.
        </p>
        <p>The following default field settings can also be overridden:</p>

        <DocsSnippet
          name="clone-group-field-options.js"
          title="Available options for clonable fields"
        />
        <h2
          id="adding-and-removing-clones"
          class="docs-md__h2"
        >
          <a
            href="#adding-and-removing-clones"
            class="heading-anchor"
          >
            Adding and removing clones
          </a>
        </h2>
        <p>
          A clone group field can have <code>minClones</code> and <code>maxClones</code> properties- integers specifying the minimum and maximum number of clones allowed.
        </p>
        <p>
          Where the number of clones is less than <code>maxClones</code> an "Add clone" button will be displayed.
        </p>
        <p>
          Where the number of clones is greater than <code>minClones</code>, a remove clone button will display with each clone.
        </p>
        <h2
          id="example-1"
          class="docs-md__h2"
        >
          <a
            href="#example-1"
            class="heading-anchor"
          >
            Example 1
          </a>
        </h2>
        <p>The example below allows the user to add email addresses, with a minimum of 2 and a maximum of 4.</p>

        <CloneGroupFormDemo />
        <h2
          id="example-2-with-preloaded-data"
          class="docs-md__h2"
        >
          <a
            href="#example-2-with-preloaded-data"
            class="heading-anchor"
          >
            Example 2 - with preloaded data
          </a>
        </h2>
        <p>
          The data object passed to the <code>ChangesetWebform</code> component may pass an array of values for a clonable field, as below.
        </p>
        <p>Note that null values are permitted.</p>
        <p>
          Note also that if the array is longer than the <code>maxClones</code> setting, the clonable field will still show one clone for each item in the array, and this will not automatically fail validation.
        </p>
        <p>
          In order to validate on the length of the array, add the <code>validateLength</code> validation rule to the <code>clone-group</code> field as shown in the component JS in the example below. Note that the validation for the clone group displays below the field label. Clicking submit below will result in the length validation error showing under the main field label.
        </p>

        <CloneGroupFormWithDataDemo />
        <p>
          Note that when the array of data passed to a <code>clone-group</code> field is longer than the <code>maxClones</code> setting, the component will still insert one clone for each item in the array. In this case, the add clone button will not be available until the user has removed clones until the total is less than the <code>maxClones</code> setting.
        </p>
        <h2
          id="validation-notes"
          class="docs-md__h2"
        >
          <a
            href="#validation-notes"
            class="heading-anchor"
          >
            Validation notes
          </a>
        </h2>
        <p>
          Note that there is an additional built in validator specifically for use in a clonedFieldSchema- <code>uniqueClone</code>. See usage in the above example. This validation rule checks that each clone is unique.
        </p>
        <p>
          See{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations#overriding-validation-messages"
            class="docs-md__a"
          >
            https://github.com/poteto/ember-changeset-validations#overriding-validation-messages
          </a>{' '}
          on how to override validation messages, while retaining dynamic values.
        </p>
        <h2
          id="clone-field-labels"
          class="docs-md__h2"
        >
          <a
            href="#clone-field-labels"
            class="heading-anchor"
          >
            Clone field labels
          </a>
        </h2>
        <h3
          id="defaults-where-not-set-"
          class="docs-md__h3"
        >
          <a
            href="#defaults-where-not-set-"
            class="heading-anchor"
          >
            Defaults (where not set)
          </a>
        </h3>
        <p>
          The <code>fieldLabel</code> property is not required for a <code>cloneFieldSchema</code>. If not set, it will default tot he <code>fieldLabel</code> of the parent form field, witht beh index of the clone appended.
        </p>
        <p>
          Note that when not set, the <code>placeholder</code> property be the same as <code>fieldLabel</code>.
        </p>
        <p>
          Set <code>hideLabel</code> to true on the <code>cloneFieldSchema</code> if you don't want the label to show.
        </p>

        <CloneGroupFormNoFieldLabelDemo />
        <h3
          id="fieldlabel-and-placeholder-strings"
          class="docs-md__h3"
        >
          <a
            href="#fieldlabel-and-placeholder-strings"
            class="heading-anchor"
          >
            <code>fieldLabel</code> and <code>placeholder</code> strings
          </a>
        </h3>
        <p>
          If a string is passed for <code>cloneFieldSchema.fieldLabel</code>, each clone will have a <code>fieldLabel</code> which begins with that string and than has its current index appended. The same applies to <code>placeholder</code>.
        </p>

        <CloneGroupFormStringFieldLabelDemo />
        <h3
          id="fieldlabel-and-placeholder-functions"
          class="docs-md__h3"
        >
          <a
            href="#fieldlabel-and-placeholder-functions"
            class="heading-anchor"
          >
            <code>fieldLabel</code> and <code>placeholder</code> functions
          </a>
        </h3>
        <p>
          If a function is passed for <code>cloneFieldSchema.fieldLabel</code>, each clone will have a <code>fieldLabel</code> is the string returned from that function.
        </p>
        <p>The function receives a single argument, whiich is the the class instance of the relevant clone.</p>
        <p>
          The same applies to <code>placeholder</code>.
        </p>

        <CloneGroupFormCustomLabelsAndPlaceholdersDemo />
      </div>
    </>
  );
}
