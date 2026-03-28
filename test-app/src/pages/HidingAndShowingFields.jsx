import HiddenFieldsExampleOneDemo from '../components/demos/HiddenFieldsExampleOneDemo.jsx';
import HiddenFieldsExampleFiveDemo from '../components/demos/HiddenFieldsExampleFiveDemo.jsx';
import HiddenFieldsExampleTwoDemo from '../components/demos/HiddenFieldsExampleTwoDemo.jsx';
import HiddenFieldsExampleThreeDemo from '../components/demos/HiddenFieldsExampleThreeDemo.jsx';
import HiddenFieldsExampleFourDemo from '../components/demos/HiddenFieldsExampleFourDemo.jsx';

export default function HidingAndShowingFields() {
  return (
    <>
      <div className="docs-md">
        <h1 id="hiding-and-showing-fields" class="docs-md__h1">
          Hiding and showing fields
        </h1>
        <h2 id="explicit-field-omission" class="docs-md__h2">
          <a href="#explicit-field-omission" class="heading-anchor">
            Explicit field omission
          </a>
        </h2>
        <h3 id="the-setfieldomission-method" class="docs-md__h3">
          <a href="#the-setfieldomission-method" class="heading-anchor">
            The <code>setFieldOmission</code> method
          </a>
        </h3>
        <p>
          This is a method of the <code>changesetWebform</code> class.
        </p>
        <p>
          Sets a fields <code>omitted</code> property to <code>true</code>. It
          receives a single argument, the <code>fieldId</code> of the field to
          update.
        </p>
        <p>
          Setting <code>omitted</code> to <code>true</code> on a fields has
          several implications:
        </p>
        <ul class="docs-list-disc">
          <li>
            the related changeset property will not be validated when the{' '}
            <code>validateFields</code> method is run on submit, or in an
            action.
          </li>
          <li>
            the fields HTML element will be removed from the DOM entirely.
          </li>
          <li>
            the related data property will not be included in the data which is
            sent with the submit action.
          </li>
          <li>
            if the field's <code>resetWhenOmitted</code> property is true (Which
            is the default) the field will be reset. This means that any unsaved
            chnages to the field's changeset property will be rolled back using{' '}
            <code>changeset.rollback()</code> and the field will be unvalidated.
          </li>
        </ul>
        <p>
          See the below example of using <code>includeField</code> and{' '}
          <code>omitField</code>.
        </p>

        <HiddenFieldsExampleOneDemo />
        <h3 id="the-setomission-method" class="docs-md__h3">
          <a href="#the-setomission-method" class="heading-anchor">
            The <code>setOmission</code> method
          </a>
        </h3>
        <p>
          This is a method of the <code>formField</code> class.
        </p>
        <p>
          The effect is exactly the same as with using the{' '}
          <code>setFieldOmission</code> method of a{' '}
          <code>changesetWebform</code> class instance above. This method simply
          offers an alternative way to achieve the same thing.
        </p>

        <HiddenFieldsExampleFiveDemo />
        <h2 id="dynamic-field-omission" class="docs-md__h2">
          <a href="#dynamic-field-omission" class="heading-anchor">
            Dynamic field omission
          </a>
        </h2>
        <p>
          It may not be convenient to use action handlers to forcibly show and
          hide fields in this scenario, so your field schema can define general
          conditions under which it should be shown or omitted. This is done
          using the <code>omitted</code> property.
        </p>
        <h3 id="the-omitted-property" class="docs-md__h3">
          <a href="#the-omitted-property" class="heading-anchor">
            The omitted property
          </a>
        </h3>
        <p>
          In order to enable dynamic field omission, the <code>omitted</code>{' '}
          property of a form field must be an object with three required
          properties.
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>returns</code>
            <ul class="docs-list-disc">
              <li>
                Boolean. The value to set field omission to if the{' '}
                <code>where</code> property evaluates as <code>true</code>. Note
                that if the <code>where</code> property evaluates as{' '}
                <code>false</code>, the field omission will be set to the
                opposite of the <code>returns</code> value.
              </li>
            </ul>
          </li>
          <li>
            <code>where</code>
            <ul class="docs-list-disc">
              <li>
                either <code>anyConditionsTrue</code> or{' '}
                <code>allConditionsTrue</code>. If{' '}
                <code>allConditionsTrue</code>, then <code>where</code> will
                evaluate to <code>true</code> if every condition in the
                conditions array evaluates to <code>true</code>. If{' '}
                <code>anyConditionsTrue</code> then <code>where</code> will
                evaluate to <code>true</code> if at least one condition in the
                conditions array evaluates to <code>true</code>.
              </li>
            </ul>
          </li>
          <li>
            <code>conditions</code>
            <ul class="docs-list-disc">
              <li>
                an array of objects each specifiying a <code>fieldId</code> and{' '}
                <code>valueEquals</code>. The condition evaluates to true if the
                current value of the related field matches that of{' '}
                <code>valueEquals</code>.
              </li>
            </ul>
          </li>
        </ul>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-attr">fieldId</span>:{' '}
            <span class="hljs-string">&#x27;chooseSeat&#x27;</span>,
            <span class="hljs-attr">omitted</span>: &#123;
            <span class="hljs-attr">returns</span>:{' '}
            <span class="hljs-literal">false</span>,
            <span class="hljs-attr">where</span>:{' '}
            <span class="hljs-string">&#x27;allConditionsTrue&#x27;</span>,
            <span class="hljs-attr">conditions</span>: [ &#123;
            <span class="hljs-attr">fieldId</span>:{' '}
            <span class="hljs-string">&#x27;isMember&#x27;</span>,
            <span class="hljs-attr">valueEquals</span>:{' '}
            <span class="hljs-string">&#x27;Yes&#x27;</span>, &#125;, &#123;
            <span class="hljs-attr">fieldId</span>:{' '}
            <span class="hljs-string">&#x27;hasTicket&#x27;</span>
            <span class="hljs-attr">valueEquals</span>:{' '}
            <span class="hljs-string">&#x27;Yes&#x27;</span>
            &#125; ], &#125;,
          </code>
        </pre>
        <p>
          Let's consider the <code>omitted</code> property in relation to the
          snippet above.
        </p>
        <p>
          First, <code>returns</code> is <code>false</code>, and{' '}
          <code>where</code> is <code>allConditionsTrue</code>.
        </p>
        <ul class="docs-list-disc">
          <li>
            This means that if every item in the <code>conditions</code> array
            evaluates to <code>true</code>, the field with a{' '}
            <code>fieldId</code> of <code>chooseSeat</code> will not be omitted.
            <ul class="docs-list-disc">
              <li>
                This only occurs if:
                <ul class="docs-list-disc">
                  <li>
                    the field with a <code>fieldId</code> of{' '}
                    <code>isMember</code> has a value of <strong>Yes</strong>,{' '}
                    <em>and</em>
                  </li>
                  <li>
                    the field with a <code>fieldId</code> of{' '}
                    <code>hasTicket</code> has a value of <strong>Yes</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            This also means that if any item in the <code>conditions</code>{' '}
            array evaluates to <code>false</code> the field with a{' '}
            <code>fieldId</code> of <code>chooseSeat</code> will be omitted.
            <ul class="docs-list-disc">
              <li>
                This occurs if:
                <ul class="docs-list-disc">
                  <li>
                    the field with a <code>fieldId</code> of{' '}
                    <code>isMember</code> does not have a value of{' '}
                    <strong>Yes</strong>, <em>or</em>
                  </li>
                  <li>
                    the field with a <code>fieldId</code> of{' '}
                    <code>hasTicket</code> does not have a value of{' '}
                    <strong>Yes</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          The live example below shows the <code>mealOption</code> field being
          omitted or not, based on the value of the <code>mealRequired</code>{' '}
          field.
        </p>

        <HiddenFieldsExampleTwoDemo />
        <h3 id="extending-the-dynamic-field-omission-api" class="docs-md__h3">
          <a
            href="#extending-the-dynamic-field-omission-api"
            class="heading-anchor"
          >
            Extending the dynamic field omission API
          </a>
        </h3>
        <p>
          By default, objects in the <code>conditions</code> array can only
          include <code>valueEquals</code> along with <code>fieldId</code> as
          properties.
        </p>
        <p>
          If you need extend this API to include comparisions other than exact
          string match, you can do so by passing a hash of additional methods to
          the <code>ChangesetWebform</code> component as the{' '}
          <code>@dynamicIncludeExcludeConditions</code> property.
        </p>
        <p>
          Each method receives <code>value</code> and <code>condition</code> as
          arguments, and should return a truthy value.
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>value</code> is the current value of the field with the{' '}
            <code>fieldId</code> specified it the condition.
          </li>
          <li>
            <code>condition</code> is the relevant condition specified.
          </li>
        </ul>
        <p>
          Now, any conditions in then <code>dynamicOmission</code> property of
          your field schema can use the names of any of these methods as a key,
          with the value to compare to.
        </p>
        <p>
          In the example below, we add and invoke the{' '}
          <code>valueDoesNotEqual</code> method.
        </p>

        <HiddenFieldsExampleThreeDemo />
        <h3 id="nested-dynamic-omission-rules" class="docs-md__h3">
          <a href="#nested-dynamic-omission-rules" class="heading-anchor">
            Nested dynamic omission rules
          </a>
        </h3>
        <p>Conditions can also be nested.</p>
        <p>
          Any item in the <code>conditions</code> array of a ruleset can itself
          be a ruleset.
        </p>
        <p>
          The example below shows howe the second condition on the{' '}
          <code>anyConditionsTrue</code> ruleset is itself an{' '}
          <code>allConditionsTrue</code> ruleset.
        </p>

        <HiddenFieldsExampleFourDemo />
      </div>
    </>
  );
}
