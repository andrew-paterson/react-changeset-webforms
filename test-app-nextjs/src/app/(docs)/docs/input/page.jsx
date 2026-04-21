import InputExampleOneDemo from '../../../../components/demos/InputExampleOneDemo.jsx';
import InputExampleTwoDemo from '../../../../components/demos/InputExampleTwoDemo.jsx';
import { DocsSnippet } from '../../../../components/docs-utils';

export default function Input() {
  return (
    <>
      <div className="docs-md">
        <h1 id="input" class="docs-md__h1">
          Input
        </h1>
        <p>Renders an HTML input.</p>
        <p>
          Calls the <code>keyUp</code>, <code>focusIn</code> and{' '}
          <code>focusOut</code> actions when the corresponding events occur.
        </p>
        <h2 id="input-field-props" class="docs-md__h2">
          <a href="#input-field-props" class="heading-anchor">
            Input field props
          </a>
        </h2>

        <DocsSnippet name="input-field-options.js" />
        <p>
          The above props are in addition to the generic field props shown with
          their default values below.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />

        <InputExampleOneDemo />

        <InputExampleTwoDemo />
      </div>
    </>
  );
}
