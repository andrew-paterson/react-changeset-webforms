import TextareaExampleOneDemo from '../../../../components/demos/TextareaExampleOneDemo.jsx';
import { DocsSnippet } from '../../../../components/docs-utils';

export default function Textarea() {
  return (
    <>
      <div className="docs-md">
        <h1 id="textarea" class="docs-md__h1">
          Textarea
        </h1>
        <p>Renders an HTML textarea.</p>
        <p>
          Calls the <code>keyUp</code>, <code>focusIn</code> and{' '}
          <code>focusOut</code> actions when the corresponding events occur.
        </p>
        <h2 id="textarea-field-props" class="docs-md__h2">
          <a href="#textarea-field-props" class="heading-anchor">
            Textarea field props
          </a>
        </h2>

        <DocsSnippet name="textarea-field-options.js" />
        <p>
          The above props are in addition to the generic field props shown with
          their default values below.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />

        <TextareaExampleOneDemo />
      </div>
    </>
  );
}
