import SelectExampleOneDemo from '../../../../components/demos/SelectExampleOneDemo.jsx';
import SelectExampleTwoDemo from '../../../../components/demos/SelectExampleTwoDemo.jsx';
import { DocsSnippet } from '../../../../components/docs-utils';

export default function Select() {
  return (
    <>
      <div className="docs-md">
        <h1 id="select" class="docs-md__h1">
          Select
        </h1>
        <p>Renders an HTML select.</p>
        <p>
          Calls the <code>keyUp</code>, <code>focusIn</code> and{' '}
          <code>focusOut</code> actions when the corresponding events occur.
        </p>
        <h2 id="select-field-props" class="docs-md__h2">
          <a href="#select-field-props" class="heading-anchor">
            Select field props
          </a>
        </h2>

        <DocsSnippet name="select-field-options.js" />
        <p>
          The above props are in addition to the generic field props shown with
          their default values below.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
        <h2 id="with-string-options" class="docs-md__h2">
          <a href="#with-string-options" class="heading-anchor">
            With string options and allowClear
          </a>
        </h2>
        <SelectExampleOneDemo />
        {/* <h2 id="with-optionvalueprop-and-optiondisplayprop" class="docs-md__h2">
          <a
            href="#with-optionvalueprop-and-optiondisplayprop"
            class="heading-anchor"
          >
            With optionValueProp and optionDisplayProp
          </a>
        </h2>
        <SelectExampleTwoDemo /> */}
      </div>
    </>
  );
}
