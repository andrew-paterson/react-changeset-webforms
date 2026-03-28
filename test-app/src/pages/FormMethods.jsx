import FormMethodsExampleOneDemo from '../components/demos/FormMethodsExampleOneDemo.jsx';
import FormMethodsExampleTwoDemo from '../components/demos/FormMethodsExampleTwoDemo.jsx';
import FormMethodsExampleThreeDemo from '../components/demos/FormMethodsExampleThreeDemo.jsx';
import FormMethodsExampleFiveDemo from '../components/demos/FormMethodsExampleFiveDemo.jsx';
import FormMethodsExampleSixDemo from '../components/demos/FormMethodsExampleSixDemo.jsx';
import FormMethodsExampleSevenDemo from '../components/demos/FormMethodsExampleSevenDemo.jsx';
import FormMethodsExampleEightDemo from '../components/demos/FormMethodsExampleEightDemo.jsx';
import FormMethodsExampleNineDemo from '../components/demos/FormMethodsExampleNineDemo.jsx';
import FormMethodsExampleTenDemo from '../components/demos/FormMethodsExampleTenDemo.jsx';
import FormMethodsExampleFourDemo from '../components/demos/FormMethodsExampleFourDemo.jsx';

export default function FormMethods() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="changesetwebform-class-methods-and-properties"
          class="docs-md__h1"
        >
          <code>changesetWebform</code> class methods and properties
        </h1>
        <p>
          Every instance of the instance of the ChangesetWebform component is
          underpinned by an instance of the <code>changesetWebform</code> class
          instance. It has several methods and properties which apply to the
          form as a whole, outlined below.
        </p>
        <p>
          Note that the <code>changesetWebform</code> class instance is included
          as an argument in all action callbacks. See{' '}
          <a href="docs/action-handling" class="docs-md__a">
            Action handling
          </a>
          .
        </p>
        <h2 id="methods" class="docs-md__h2">
          <a href="#methods" class="heading-anchor">
            Methods
          </a>
        </h2>
        <h3 id="validate" class="docs-md__h3">
          <a href="#validate" class="heading-anchor">
            <code>validate</code>
          </a>
        </h3>
        <p>
          Arguments: (<code>opts</code>)
        </p>
        <p>
          Validates all fields which are not omitted (See{' '}
          <a href="/docs/hiding-and-showing-fields" class="docs-md__a">
            Hiding and showing fields
          </a>
          ).
        </p>

        <FormMethodsExampleOneDemo />
        <p>
          If you would like to only revalidate fields which have already been
          validated, set <code>opts.skipUnvalidated</code> to <code>true</code>.
        </p>

        <FormMethodsExampleTwoDemo />
        <h3 id="setfieldomission" class="docs-md__h3">
          <a href="#setfieldomission" class="heading-anchor">
            <code>setFieldOmission</code>
          </a>
        </h3>
        <p>
          Allows you to update whether or not a form field is omitted, by
          passing the <code>fieldId</code> and a boolean value.
        </p>
        <p>
          See{' '}
          <a
            href="/docs/hiding-and-showing-fields#the-setfieldomission-method"
            class="docs-md__a"
          >
            /docs/hiding-and-showing-fields#the-setfieldomission-method
          </a>
          .
        </p>

        <FormMethodsExampleThreeDemo />
        <h3 id="getfield" class="docs-md__h3">
          <a href="#getfield" class="heading-anchor">
            <code>getField</code>
          </a>
        </h3>
        <p>
          Retrives a field int he changesetWebform based on the{' '}
          <code>fieldId</code> property.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            @action
            <span class="hljs-title function_">onFieldValueChange</span>(
            <span class="hljs-params">formField, changesetWebform</span>) &#123;
            <span class="hljs-keyword">const</span> emailField =
            changesetWebform.<span class="hljs-title function_">getField</span>(
            <span class="hljs-string">&#x27;email&#x27;</span>);{' '}
            <span class="hljs-comment">
              // The field with `fieldId === &#x27;email&#x27;
            </span>
            &#125;
          </code>
        </pre>
        <h3 id="getdata" class="docs-md__h3">
          <a href="#getdata" class="heading-anchor">
            <code>getData</code>
          </a>
        </h3>
        <p>
          Saves the underlying chnageset, and returns the value of{' '}
          <code>changeset.data</code>. This is the javascript object whoch
          represents that collective values of the form fields. It is the data
          that would be passed to <code>submitData</code>.
        </p>

        <FormMethodsExampleFiveDemo />
        <h3 id="pusherrors" class="docs-md__h3">
          <a href="#pusherrors" class="heading-anchor">
            <code>pushErrors</code>
          </a>
        </h3>
        <p>
          Allows you to push errors on to any field in the{' '}
          <code>changesetWebform</code> object. The example below will do so if
          the email <code>taken@example.com</code> is submitted.
        </p>

        <FormMethodsExampleSixDemo />
        <h3 id="clear" class="docs-md__h3">
          <a href="#clear" class="heading-anchor">
            <code>clear</code>
          </a>
        </h3>
        <p>
          Sets the value of each form field to <code>null</code>, and resets the
          form UI.
        </p>
        <h4 id="clear-form-callbacks" class="docs-md__h4">
          <a href="#clear-form-callbacks" class="heading-anchor">
            Clear form callbacks
          </a>
        </h4>
        <p>
          If an action is passed to the <code>ChangesetWebform</code> component
          as <code>@beforeClearForm</code>, it will be called after the clear
          button is clicked, but before any of the clear form code runs.
        </p>
        <p>
          Similarly, if an action is passed to the <code>ChangesetWebform</code>{' '}
          component as <code>@afterClearForm</code>, it will be called after the
          clear form code has been run.
        </p>

        <FormMethodsExampleSevenDemo />
        <h3 id="reset" class="docs-md__h3">
          <a href="#reset" class="heading-anchor">
            <code>reset</code>
          </a>
        </h3>
        <p>Resets the value of each field, and resets the form UI.</p>
        <p>
          It's important to note that under the hood this method runs the{' '}
          <code>rollback</code> method on the underlying changeset. This has a
          few important consequences, outlined below.
        </p>
        <ol class="docs-list-decimal">
          <li>
            If a field has an initial value from the <code>@data</code> prop
            passed to the <code>ChangesetWebform</code> component, clicking the
            reset button will reset that field to that initial value. See how,
            in the example below, the fields are reset to their initial values
            if they are updated and then ther reset button is clicked.
          </li>
        </ol>

        <FormMethodsExampleEightDemo />
        <ol class="docs-list-decimal">
          <li>
            If a field was inserted with <code>defaultValue</code>, clicking the
            reset button will clear that field, because in this case the value
            has not been saved on the changeset. See how the fields are cleared
            when the reset button is clicked in the example below.
          </li>
        </ol>

        <FormMethodsExampleNineDemo />
        <ol class="docs-list-decimal">
          <li>
            If fields are updated and the <code>save</code> method of the
            underlying changeset is called, then clicking the reset button will
            reset fields to their values when the chnageset was last saved. The
            most common instance of this is when the submit button is clicked.
            See how, in the example above, if the submit button is clicked when
            the fields have values, then clicking the reset button resets the
            fields to those values, rather than clearing them.
          </li>
        </ol>
        <h4 id="reset-form-callbacks" class="docs-md__h4">
          <a href="#reset-form-callbacks" class="heading-anchor">
            Reset form callbacks
          </a>
        </h4>
        <p>
          If an action is passed to the <code>ChangesetWebform</code> component
          as <code>@beforeResetForm</code>, it will be called after the reset
          form button is clicked, but before any of the reset form code runs.
        </p>
        <p>
          Similarly, if an action is passed to the <code>ChangesetWebform</code>{' '}
          component as <code>@afterResetForm</code>, it will be called after the
          reset form form code has been run.
        </p>
        <h2 id="properties" class="docs-md__h2">
          <a href="#properties" class="heading-anchor">
            Properties
          </a>
        </h2>
        <h3 id="hasvalidationerrors" class="docs-md__h3">
          <a href="#hasvalidationerrors" class="heading-anchor">
            hasValidationErrors
          </a>
        </h3>
        <p>
          Returns <code>true</code> if one or more fields have validation
          errors.
        </p>
        <p>
          This allows us to ignore fields which have not yet been validated, and
          check if any of those that have been validated failed validation.
        </p>

        <FormMethodsExampleTenDemo />
        <h3 id="hasunvalidatedfields" class="docs-md__h3">
          <a href="#hasunvalidatedfields" class="heading-anchor">
            hasUnvalidatedFields
          </a>
        </h3>
        <p>
          Returns <code>true</code> if there are any fields which have
          validation rules, but have not yet been validated.
        </p>
        <p>
          Using <code>hasUnvalidatedFields</code> with{' '}
          <code>hasValidationErrors</code> allows us to check that all fields
          with validation rules have validated successfully.
        </p>
        <p>
          Thus, in the example below, if you click the "Check if all fields have
          successfully validated" button, while both fields are empty and
          unvalidated, the alert will show that the form is not valid, but the
          form itself will not update in any way.
        </p>

        <FormMethodsExampleFourDemo />
      </div>
    </>
  );
}
