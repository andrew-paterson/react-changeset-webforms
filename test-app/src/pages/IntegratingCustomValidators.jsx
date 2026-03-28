import CustomValidatorsFormDemo from '../components/demos/CustomValidatorsFormDemo.jsx';

export default function IntegratingCustomValidators() {
  return (
    <>
      <div className="docs-md">
        <h1 id="integrating-custom-validators" class="docs-md__h1">
          Integrating custom validators
        </h1>
        <p>
          The{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations#writing-your-own-validators"
            class="docs-md__a"
          >
            Ember Changeset Validations docs on writing your own validators
          </a>{' '}
          outlines how to write your own synchronous or asynchronous validators.
        </p>
        <p>
          The method for creating custom validators in{' '}
          <strong>Ember Changeset Webforms</strong> is identical, but in order
          to use them, you must pass your custom validators to the{' '}
          <code>ChangesetWebform</code> component as the{' '}
          <code>@customValidators</code> property.
        </p>
        <p>
          The format of the <code>@customValidators</code> property should be a
          javascript object with a named method for each custom validator that
          you would like to use in the component.
        </p>
        <h2 id="example" class="docs-md__h2">
          <a href="#example" class="heading-anchor">
            Example
          </a>
        </h2>
        <p>The example below shows how to:</p>
        <ol class="docs-list-decimal">
          <li>
            Define a custom validator named <code>uniqueness.js</code> in the{' '}
            <code>validators</code> directory of your app.
          </li>
          <li>
            Import your validator into a component and include it in{' '}
            <code>formSettings.validators</code>.
          </li>
        </ol>

        <CustomValidatorsFormDemo />
        <h2 id="arguments" class="docs-md__h2">
          <a href="#arguments" class="heading-anchor">
            Arguments
          </a>
        </h2>
        <p>
          When defining your custom validator, the single argument to the main
          function will receive everything in the <code>arguments</code>{' '}
          property of the relevant validation rule, defined in the{' '}
          <code>validationRules</code> array for the field.
        </p>
        <p>
          In the example above, the field definitions have an object called{' '}
          <code>descriptionsMap</code> passed to the <code>arguments</code>{' '}
          property.
        </p>
        <pre class="docs-md__code">
          <code>
            validationRules: [&#123; validationMethod: 'validateUniqueness',
            arguments: &#123; descriptionsMap: &#123; primaryEmail: 'primary
            email', recoveryEmail: 'recovery email' &#125; &#125; &#125;],
          </code>
        </pre>
        <p>
          The corresponding validator function can now access{' '}
          <code>descriptionsMap</code> object via{' '}
          <code>opts.descriptionsMap</code>.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-keyword">export</span>{' '}
            <span class="hljs-keyword">default</span>{' '}
            <span class="hljs-keyword">function</span>{' '}
            <span class="hljs-title function_">validateUniqueness</span>(
            <span class="hljs-params">opts = &#123;&#125;</span>) &#123;
            <span class="hljs-variable language_">console</span>.
            <span class="hljs-title function_">log</span>(opts)
            <span class="hljs-comment">// descriptionsMap: &#123;</span>
            <span class="hljs-comment">
              // primaryEmail: &#x27;primary email&#x27;,
            </span>
            <span class="hljs-comment">
              // recoveryEmail: &#x27;recovery email&#x27;
            </span>
            <span class="hljs-comment">// &#125;</span>
            ...
          </code>
        </pre>
      </div>
    </>
  );
}
