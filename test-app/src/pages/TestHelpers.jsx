import { DocsSnippet } from '../components/docs-utils';

export default function TestHelpers() {
  return (
    <>
      <div className="docs-md">
        <h1 id="test-helpers" class="docs-md__h1">
          Test helpers
        </h1>
        <h2 id="wasvalidated" class="docs-md__h2">
          <a href="#wasvalidated" class="heading-anchor">
            <code>wasValidated</code>
          </a>
        </h2>
        <p>
          Determines whether or not a field has been validated, by checking if
          the expected UI conditions for a valid or invalid field are present.
        </p>
        <p>First, import ther helper.</p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-keyword">import</span> &#123; wasValidated &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>wasValidated</code> helper receives two arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a form field in the DOM, or the DOM element itself.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                The function needs to know what values to check for each
                condition, and which elements should have them. Thus we pass it
                an options hash as the second argument. The available props are
                shown in <strong>"Example opts hash"</strong> below.
              </li>
            </ul>
          </li>
        </ul>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          <strong>Example usage</strong>{' '}
        </p>

        <DocsSnippet
          name="was-validated-test-helper-usage.js"
          title="Example usage of the wasValidated test helper"
        />
        <h2 id="allvalidated" class="docs-md__h2">
          <a href="#allvalidated" class="heading-anchor">
            <code>allValidated</code>
          </a>
        </h2>
        <p>
          Determines whether or not all the fields in a set have been validated,
          by checking if the expected UI conditions for a valid or invalid field
          are present for each one.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; allValidated &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>allValidated</code> helper receives three arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a set or form fields or cloned fields in the DOM, or the DOM
                elements themselves.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                The function needs to know what values to check for each
                condition, and which elements should have them. Thus we pass it
                an options hash as the second argument. The available props are
                shown in <strong>"Example opts hash"</strong> below.
              </li>
            </ul>
          </li>
          <li>
            <code>indexes</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                the indexes from the set of elements to check. If not passed,
                all elements in the set will be checked.
              </li>
            </ul>
          </li>
        </ul>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          <strong>Example usage</strong>{' '}
        </p>
        <p>
          This example checks that the 1st, 2nd, 4th, 5th and 6th elements in
          the set returned by the selector{' '}
          <code>
            $&#123;testEls.clonableFieldWithData&#125;
            $&#123;els.cwfCloneWrapper&#125;
          </code>{' '}
          have all been validated.
        </p>

        <DocsSnippet
          name="all-validated-test-helper-usage.js"
          title="Example usage of the allvalidated test helper"
        />
        <h2 id="nonevalidated" class="docs-md__h2">
          <a href="#nonevalidated" class="heading-anchor">
            <code>noneValidated</code>
          </a>
        </h2>
        <p>
          Determines whether or not all the fields in a set have not been
          validated, by checking that the expected UI conditions for a valid or
          invalid field are not present for each one.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; noneValidated &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>noneValidated</code> helper receives three arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a set or form fields or cloned fields in the DOM, or the DOM
                elements themselves.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                The function needs to know what values to check for each
                condition, and which elements should have them. Thus we pass it
                an options hash as the second argument. The available props are
                shown in <strong>"Example opts hash"</strong> below.
              </li>
            </ul>
          </li>
          <li>
            <code>indexes</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                the indexes from the set of elements to check. If not passed,
                all elements in the set will be checked.
              </li>
            </ul>
          </li>
        </ul>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          <strong>Example usage</strong>{' '}
        </p>
        <p>
          This example checks that the 1st and second elements in the set
          returned by the selector{' '}
          <code>
            $&#123;testEls.clonableFieldBasics&#125;
            $&#123;els.cwfCloneWrapper&#125;
          </code>{' '}
          have all been validated.
        </p>

        <DocsSnippet
          name="none-validated-test-helper-usage.js"
          title="Example usage of the noneValidated test helper"
        />
        <h2 id="passedvalidation" class="docs-md__h2">
          <a href="#passedvalidation" class="heading-anchor">
            <code>passedValidation</code>
          </a>
        </h2>
        <p>
          Returns <code>true</code> if the field UI satisfies the conditions for
          a field which has passed validation. The conditions checked are:
        </p>
        <ul class="docs-list-disc">
          <li>the field element does not contain any error messages,</li>
          <li>
            the field elements which should have the validation class names have
            the class names for a valid field,
          </li>
          <li>
            the field elements which should have the validation class names do
            not have the class names for an invalid field,
          </li>
          <li>
            the field elements which should have the border colour for a valid
            element (if any) do have that border colour,
          </li>
          <li>
            the field elements which should have the background colour for a
            valid element (if any) do have that border colour,
          </li>
          <li>
            the field element which should have background image property of a
            valid field (if any) does have it.
          </li>
        </ul>
        <p>
          The function needs to know what values to check for each condition,
          adn which elements should have them. Thus we pass it an options hash
          as the third argument. The availablke props are shown in the example
          below.{' '}
        </p>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          Note that the above options work with the addon defaults, which are
          based on Bootstrap styling.{' '}
        </p>
        <p>
          Note that <code>validBorderColour</code>,{' '}
          <code>invalidBorderColour</code>, <code>validBackgroundColour</code>,{' '}
          <code>invalidBackgroundColour</code>,{' '}
          <code>validBackgroundImage</code>, and{' '}
          <code>invalidBackgroundImage</code> are not required. If absent, they
          will not be checked.
        </p>
        <p>
          The <code>passedValidation</code> helper received four arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a form field in the DOM, or the DOM element itself.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                See <strong>Example opts hash</strong> above
              </li>
            </ul>
          </li>
          <li>
            <code>assert</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                The assert funciton from the test function. If present, the
                function will create an assertion for each check.
              </li>
            </ul>
          </li>
          <li>
            <code>assertionSuffix</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                Only relevant if the assert argument is included. A string to
                append to the end of the assertions created.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          First, import the helper. In this example, we also import the default
          options hash to pass as the second argument. In practice these options
          can be defined anywhere.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-keyword">import</span> &#123; passedValidation
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;<span class="hljs-keyword">import</span>{' '}
            validationTestHelpersDefaults <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/validation-test-helpers-defaults&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          <strong>Examples</strong>
        </p>

        <DocsSnippet
          name="passed-validation-helper-return-boolean.js"
          title="Usage which returns a boolean value"
        />

        <DocsSnippet
          name="passed-validation-helper-with-assert.js"
          title="Usage which creates an assertion for each check"
        />
        <h2 id="failedvalidation" class="docs-md__h2">
          <a href="#failedvalidation" class="heading-anchor">
            <code>failedValidation</code>
          </a>
        </h2>
        <p>
          Returns <code>true</code> if the field UI satisfies the conditions for
          a field which has failed validation. The conditions checked are:
        </p>
        <ul class="docs-list-disc">
          <li>the field element does contain any error messages,</li>
          <li>
            the field elements which should have the validation class names have
            the class names for an invalid field,
          </li>
          <li>
            the field elements which should have the validation class names do
            not have the class names for a valid field,
          </li>
          <li>
            the field elements which should have the border colour for an
            invalid element (if any) do have that border colour,
          </li>
          <li>
            the field elements which should have the background colour for an
            invalid element (if any) do have that border colour,
          </li>
          <li>
            the field element which should have background image property of an
            invalid field (if any) does have it.
          </li>
        </ul>
        <p>
          The function needs to know what values to check for each condition,
          and which elements should have them. Thus we pass it an options hash
          as the second argument. The available props are shown in the example
          below.{' '}
        </p>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          Note that the above options work with the addon defaults, which are
          based on Bootstrap styling.{' '}
        </p>
        <p>
          Note that <code>validBorderColour</code>,{' '}
          <code>invalidBorderColour</code>, <code>validBackgroundColour</code>,{' '}
          <code>invalidBackgroundColour</code>,{' '}
          <code>validBackgroundImage</code>, and{' '}
          <code>invalidBackgroundImage</code> are not required. If absent, they
          will not be checked.
        </p>
        <p>
          The <code>failedValidation</code> helper receives four arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a form field in the DOM, or the DOM element itself.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                See <strong>Example opts hash</strong> above
              </li>
            </ul>
          </li>
          <li>
            <code>assert</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                The assert function from the test function. If present, the
                function will create an assertion for each check.
              </li>
            </ul>
          </li>
          <li>
            <code>assertionSuffix</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                Only relevant if the assert argument is included. A string to
                append to the end of the assertions created.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          First, import the helper. In this example, we also import the default
          options hash to pass as the second argument. In practice these options
          can be defined anywhere.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-keyword">import</span> &#123; failedValidation
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;<span class="hljs-keyword">import</span>{' '}
            validationTestHelpersDefaults <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/validation-test-helpers-defaults&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          <strong>Examples</strong>
        </p>

        <DocsSnippet
          name="failed-validation-helper-return-boolean.js"
          title="Usage which returns a boolean value"
        />

        <DocsSnippet
          name="failed-validation-helper-with-assert.js"
          title="Usage which creates an assertion for each check"
        />
        <h2 id="allpassedvalidation" class="docs-md__h2">
          <a href="#allpassedvalidation" class="heading-anchor">
            <code>allPassedValidation</code>
          </a>
        </h2>
        <p>
          Determines whether or not all the fields in a set have passed
          validation, by checking if the expected UI conditions for a valid
          field are present for each one.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; allPassedValidation
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>allPassedValidation</code> helper receives three arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a set or form fields or cloned fields in the DOM, or the DOM
                elements themselves.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                The function needs to know what values to check for each
                condition, and which elements should have them. Thus we pass it
                an options hash as the second argument. The available props are
                shown in <strong>"Example opts hash"</strong> below.
              </li>
            </ul>
          </li>
          <li>
            <code>indexes</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                the indexes from the set of elements to check. If not passed,
                all elements in the set will be checked.
              </li>
            </ul>
          </li>
        </ul>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          <strong>Example usage</strong>{' '}
        </p>
        <p>
          This example checks that the 4th, 5th and 6th elements in the set
          returned by the selector{' '}
          <code>
            $&#123;testEls.clonableFieldWithData&#125;
            $&#123;els.cwfCloneWrapper&#125;
          </code>{' '}
          have all passed validation.
        </p>

        <DocsSnippet
          name="all-passed-validation-test-helper-usage.js"
          title="Example usage of the allPassedValidation test helper"
        />
        <h2 id="allfailedvalidation" class="docs-md__h2">
          <a href="#allfailedvalidation" class="heading-anchor">
            <code>allFailedValidation</code>
          </a>
        </h2>
        <p>
          Determines whether or not all the fields in a set have failed
          validation, by checking if the expected UI conditions for a invalid
          field are present for each one.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; allFailedValidation
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>allFailedValidation</code> helper receives three arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a set or form fields or cloned fields in the DOM, or the DOM
                elements themselves.
              </li>
            </ul>
          </li>
          <li>
            <code>opts</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>
              </li>
              <li>
                The function needs to know what values to check for each
                condition, and which elements should have them. Thus we pass it
                an options hash as the second argument. The available props are
                shown in <strong>"Example opts hash"</strong> below.
              </li>
            </ul>
          </li>
          <li>
            <code>indexes</code>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                the indexes from the set of elements to check. If not passed,
                all elements in the set will be checked.
              </li>
            </ul>
          </li>
        </ul>

        <DocsSnippet
          name="validation-test-helpers-defaults.js"
          title="Example opts hash"
        />
        <p>
          <strong>Example usage</strong>{' '}
        </p>
        <p>
          This example checks that the 1st and 2nd elements in the set returned
          by the selector{' '}
          <code>
            $&#123;testEls.clonableFieldWithData&#125;
            $&#123;els.cwfCloneWrapper&#125;
          </code>{' '}
          have all failed validation.
        </p>

        <DocsSnippet
          name="all-failed-validation-test-helper-usage.js"
          title="Example usage of the allFailedValidation test helper"
        />
        <h2 id="removeclones" class="docs-md__h2">
          <a href="#removeclones" class="heading-anchor">
            <code>removeClones</code>
          </a>
        </h2>
        <p>
          Removes specified cloned field elements by clicking their remove
          buttons in the DOM.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; removeClones &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>removeClones</code> helper receives two arguments
        </p>
        <ul class="docs-list-disc">
          <li>
            <p>
              <code>identifier</code>{' '}
            </p>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a DOM element which contains cloned fields, or the DOM
                element itself.
              </li>
            </ul>
          </li>
          <li>
            <p>
              <code>indexes</code>
            </p>
            <ul class="docs-list-disc">
              <li>
                <strong>Optional</strong>
              </li>
              <li>
                the indexes from the set of clones found inside the identifier
                element to remove. If not passed, all clones in the set will be
                removed.
              </li>
            </ul>
            <p>
              <strong>Example</strong>
            </p>
          </li>
        </ul>

        <DocsSnippet
          name="remove-clones-test-helper-usage.js"
          title="Example usage of the removeClones test helper"
        />
        <h2 id="addclone" class="docs-md__h2">
          <a href="#addclone" class="heading-anchor">
            <code>addClone</code>
          </a>
        </h2>
        <p>
          Adds a clone in a cloned form field by clicking the add clone button
          in the DOM.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; addClone &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>addClone</code> helper receives one argument
        </p>
        <ul class="docs-list-disc">
          <li>
            <p>
              <code>identifier</code>{' '}
            </p>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a clonable form field in the DOM, or the DOM element itself.
              </li>
            </ul>
            <p>
              <strong>Example</strong>
            </p>
          </li>
        </ul>

        <DocsSnippet
          name="add-clone-test-helper-usage.js"
          title="Example usage of the removeClones test helper"
        />
        <h2 id="clicksubmitbutton" class="docs-md__h2">
          <a href="#clicksubmitbutton" class="heading-anchor">
            <code>clickSubmitButton</code>
          </a>
        </h2>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123; clickSubmitButton
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>clickSubmitButton</code> helper receives one argument
        </p>
        <ul class="docs-list-disc">
          <li>
            <p>
              <code>identifier</code>{' '}
            </p>
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a clonable form field in the DOM, or the DOM element itself.
              </li>
            </ul>
            <p>
              <strong>Example</strong>
            </p>
          </li>
        </ul>

        <DocsSnippet
          name="click-submit-button-test-helper-usage.js"
          title="Example usage of the clickSubmitButton test helper"
        />
        <h2 id="changesetwebformstateasjson" class="docs-md__h2">
          <a href="#changesetwebformstateasjson" class="heading-anchor">
            <code>changesetWebformStateAsJSON</code>
          </a>
        </h2>
        <p>
          Analyses a <code>ChangesetWebform</code> component is it is currently
          rendered in the DOM, and returns an object which describes the fields,
          including their current values and validation statuses.{' '}
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// Import</span>
            <span class="hljs-keyword">import</span> &#123;
            changesetWebformStateAsJSON &#125;{' '}
            <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ;
          </code>
        </pre>
        <p>
          The <code>changesetWebformStateAsJSON</code> helper receives one
          argument
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>identifier</code>{' '}
            <ul class="docs-list-disc">
              <li>
                <strong>Required</strong>{' '}
              </li>
              <li>
                The <code>identifier</code> argument can either be the selector
                of a <code>ChangesetWebform</code> form element in the DOM, or
                the DOM element itself.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Example</strong>
        </p>

        <DocsSnippet
          name="changeset-webform-state-as-json-test-helper-usage.js"
          title="Example usage of the changesetWebformStateAsJSON test helper"
        />
        <h2 id="fielderrortext" class="docs-md__h2">
          <a href="#fielderrortext" class="heading-anchor">
            <code>fieldErrorText</code>
          </a>
        </h2>
        <p>
          Retrieves the text content of all field errors from the DOM, and
          returns an array of stings.
        </p>
        <p>First, import the helper. </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-comment">// import</span>
            <span class="hljs-keyword">import</span> &#123; fieldErrorText
            &#125; <span class="hljs-keyword">from</span>{' '}
            <span class="hljs-string">
              &#x27;ember-changeset-webforms/test-support/helpers&#x27;
            </span>
            ; onst errors ={' '}
            <span class="hljs-title function_">fieldErrorText</span>(identifier)
          </code>
        </pre>
        <p>
          The <code>identifier</code> argument can either be the selector of an
          element of a form field in the DOM, or the which contains the field
          errors, or a DOM element which contains the field errors.
        </p>
      </div>
    </>
  );
}
