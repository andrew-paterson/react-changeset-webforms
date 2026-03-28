import { Link } from 'react-router-dom';

export default function DebugMode() {
  return (
    <>
      <div className="docs-md">
        <h1 id="debug-mode" class="docs-md__h1">
          Debug mode
        </h1>
        <p>
          Debug mode can be switched globally, by setting{' '}
          <code>debug = true</code> in the{' '}
          <code>services/ember-changeset-webforms.js</code>.
        </p>
        <p>
          It can also be switched on for a single instance of the{' '}
          <code>ChangesetWebform</code> component by passing{' '}
          <code>@debug=</code> to the component.
        </p>
        <h2 id="effects" class="docs-md__h2">
          <a href="#effects" class="heading-anchor">
            Effects
          </a>
        </h2>
        <h3
          id="the-changesetwebform-object-is-logged-after-creation"
          class="docs-md__h3"
        >
          <a
            href="#the-changesetwebform-object-is-logged-after-creation"
            class="heading-anchor"
          >
            The <code>changesetWebform</code> object is logged after creation
          </a>
        </h3>
        <p>
          When debug mode is on for any instance of the{' '}
          <code>ChangesetWebform</code> component, the underlying{' '}
          <code>changesetWebform</code> object will be logged to the console
          when it has been created.
        </p>
        <p>
          This object contains all of the data that underpins the relevant
          webform.
        </p>
        <h3
          id="-debug-classes-are-added-to-all-elements-with-configurable-class-names"
          class="docs-md__h3"
        >
          <a
            href="#-debug-classes-are-added-to-all-elements-with-configurable-class-names"
            class="heading-anchor"
          >
            <code>$DEBUG-</code> classes are added to all elements with
            configurable class names
          </a>
        </h3>
        <p>
          Thse debugging classes assist with configuring class names of the
          various elements in your webforms. See{' '}
          <Link to="/docs/manipulating-element-class-names-and-attrs">
            docs.manipulating-element-class-names-and-attrs
          </Link>{' '}
          for more.
        </p>
        <p>
          Here is a quick overview. In various places, you can configure class
          names via the <code>classNames</code> object.
        </p>
        <p>
          For example, at the lowest level this can be added to a formField
          invocation in a form schema like this:
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            &#123;
            <span class="hljs-attr">fieldId</span>:{' '}
            <span class="hljs-string">&#x27;myField&#x27;</span>, ...
            <span class="hljs-attr">classNames</span>: &#123;
            <span class="hljs-attr">labelElement</span>: [
            <span class="hljs-string">
              &#x27;field-label-element-class&#x27;
            </span>
            ],
            <span class="hljs-attr">fieldLabel</span>: [
            <span class="hljs-string">&#x27;form-label&#x27;</span>] &#125;
          </code>
        </pre>
        <p>
          With debug mode on, you will see{' '}
          <code>[$DEBUG=:configNameSpace===***]</code> classes added to various
          elements. The value of *** indicates the name of the property in the{' '}
          <code>classNames</code> that was used to invoke the class names which
          follow it.
        </p>
        <pre class="docs-md__code">
          <code>
            <label class="[$DEBUG=:configNameSpace===labelElement] field-label-element-class [$DEBUG=:configNameSpace===fieldLabel] form-label">
              Phone number
            </label>
          </code>
        </pre>
        <p>The example above would tell us that</p>
        <ul class="docs-list-disc">
          <li>
            The class <code>field-label-element-class</code> is added via{' '}
            <code>classNames.labelElement</code> property.
          </li>
          <li>
            The class <code>form-label</code> is added via the{' '}
            <code>classNames.fieldLabel</code> property.
          </li>
        </ul>
        <p>
          This also tell us the name of the property in <code>classNames</code>{' '}
          we need to use to add class names to a particular element in the DOM.
        </p>
      </div>
    </>
  );
}
