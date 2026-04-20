import StaticContentExampleOneDemo from '../../../components/demos/StaticContentExampleOneDemo.jsx';
import StaticContentExampleTwoDemo from '../../../components/demos/StaticContentExampleTwoDemo.jsx';
import { DocsSnippet } from '../../../components/docs-utils';

export default function StaticContentField() {
  return (
    <>
      <div className="docs-md">
        <h1 id="static-content-field" class="docs-md__h1">
          Static content field
        </h1>
        <p>
          This field can be used to static content in a form. It has no action
          handlers.
        </p>
        <p>
          If static text is sufficient, you can simply use the <code>text</code>{' '}
          prop to pass the static text to display, and the{' '}
          <code>textElement</code> prop to specify what element the text should
          be wrapped in.
        </p>
        <p>
          <code>textElementClass</code> can also be set to a string of class
          names to be added to the text element.
        </p>

        <StaticContentExampleOneDemo />
        <h2
          id="static-content-field-with-custom-content-component"
          class="docs-md__h2"
        >
          <a
            href="#static-content-field-with-custom-content-component"
            class="heading-anchor"
          >
            Static content field with custom content component
          </a>
        </h2>

        <StaticContentExampleTwoDemo />
        <p>Alternatively, you can pass `</p>

        <DocsSnippet name="staticContent-field-options.js" />
        <p>
          The above props are in addition to the generic field props shown with
          their default values below.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
      </div>
    </>
  );
}
