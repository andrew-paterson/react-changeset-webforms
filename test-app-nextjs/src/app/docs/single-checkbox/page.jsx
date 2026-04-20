import SingleCheckboxExampleOneDemo from '../../../components/demos/SingleCheckboxExampleOneDemo.jsx';
import SingleCheckboxExampleTwoDemo from '../../../components/demos/SingleCheckboxExampleTwoDemo.jsx';
import SingleCheckboxExampleThreeDemo from '../../../components/demos/SingleCheckboxExampleThreeDemo.jsx';
import { DocsSnippet } from '../../../components/docs-utils';

export default function SingleCheckbox() {
  return (
    <>
      <div className="docs-md">
        <h1 id="single-checkbox" class="docs-md__h1">
          Single checkbox
        </h1>
        <p>Renders a single checkbox with a label.</p>
        <p>
          The field ID is set to <code>true</code> or <code>false</code>{' '}
          depending on whether the checkbox is checked or not.
        </p>
        <h2 id="single-checkbox-props" class="docs-md__h2">
          <a href="#single-checkbox-props" class="heading-anchor">
            Single checkbox props
          </a>
        </h2>

        <DocsSnippet name="singleCheckbox-field-options.js" />
        <p>
          The above props are in addition to the generic field props shown with
          their default values below.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
        <h2 id="single-checkbox-basic-usage" class="docs-md__h2">
          <a href="#single-checkbox-basic-usage" class="heading-anchor">
            Single checkbox basic usage
          </a>
        </h2>

        <SingleCheckboxExampleOneDemo />
        <h2 id="single-checkbox-markdown-checkbox-label" class="docs-md__h2">
          <a
            href="#single-checkbox-markdown-checkbox-label"
            class="heading-anchor"
          >
            Single checkbox markdown checkbox label
          </a>
        </h2>
        <p>
          You can also pass a markdown string to the{' '}
          <code>checkboxLabelMarkdown</code> prop. This will be rendered as HTML
          inside a <code>label</code> element.
        </p>

        <SingleCheckboxExampleTwoDemo />
        <h2
          id="single-checkbox-custom-component-for-checkbox-label"
          class="docs-md__h2"
        >
          <a
            href="#single-checkbox-custom-component-for-checkbox-label"
            class="heading-anchor"
          >
            Single checkbox custom component for checkbox label
          </a>
        </h2>
        <p>
          You can use a custom component for the checkbox label by passing{' '}
          <code>checkBoxLabelComponent</code> to the field. The component passed
          will then be rendered in place of the standard label element for each
          option.
        </p>
        <p>The object passed must take the following form.</p>
        <pre class="docs-md__code">
          <code>
            &#123; componentClass: // Class, required. The imported class of the
            component to render. props: // Object, optional. This object that
            will be passed to the component as "props" &#125;
          </code>
        </pre>
        <ul class="docs-list-disc">
          <li>
            The component template will have access to the <code></code> boolean
            as well as the <code></code> hash which includes the{' '}
            <code>label</code> and <code>key</code> props for that option.
          </li>
          <li>
            Accessibility features
            <ul class="docs-list-disc">
              <li>
                Set <code>for=</code> on the label element, to ensure that the
                browser knows which checkbox the label is for.
              </li>
              <li>
                Set <code>id=</code> so that the <code>aria-labelledby</code>{' '}
                attribute on the checkbox works correctly.
              </li>
            </ul>
          </li>
        </ul>

        <SingleCheckboxExampleThreeDemo />
      </div>
    </>
  );
}
