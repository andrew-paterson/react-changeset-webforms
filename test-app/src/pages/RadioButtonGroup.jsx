import RadioButtonGroupExampleOneDemo from '../components/demos/RadioButtonGroupExampleOneDemo.jsx';
import RadioButtonGroupExampleThreeDemo from '../components/demos/RadioButtonGroupExampleThreeDemo.jsx';
import RadioButtonGroupExampleTwoDemo from '../components/demos/RadioButtonGroupExampleTwoDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';

export default function RadioButtonGroup() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="radio-button-group"
          class="docs-md__h1"
        >
          Radio button group
        </h1>
        <p>
          Renders a radio button group. The value of the field as a whole is the <code>value</code> property of the currently selected option.
        </p>
        <h2
          id="radio-button-group-props"
          class="docs-md__h2"
        >
          <a
            href="#radio-button-group-props"
            class="heading-anchor"
          >
            Radio button group props
          </a>
        </h2>

        <DocsSnippet name="radioButtonGroup-field-options.js" />
        <p>The above props are in addition to the generic field props shown with their default values below.</p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
        <h2
          id="radio-button-group-options-prop"
          class="docs-md__h2"
        >
          <a
            href="#radio-button-group-options-prop"
            class="heading-anchor"
          >
            Radio button group <code>options</code> prop
          </a>
        </h2>
        <p>
          Each option in the <code>options</code> property of field with type <code>radioButtonGroup</code> can have the following properties.
        </p>

        <DocsSnippet name="radio-button-group-option.js" />
        <p>
          You can also pass a primitive value, such as a string or number as an option. In this case the option will be expanded into an object in which the values of the <code>label</code> and <code>value</code> properties will be the same.
        </p>
        <p>The above props are in addition to the generic field props shown with their default values below.</p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
        <h2
          id="basic-usage"
          class="docs-md__h2"
        >
          <a
            href="#basic-usage"
            class="heading-anchor"
          >
            Basic usage
          </a>
        </h2>

        <RadioButtonGroupExampleOneDemo />
        <h2
          id="option-label-content-in-markdown"
          class="docs-md__h2"
        >
          <a
            href="#option-label-content-in-markdown"
            class="heading-anchor"
          >
            Option label content in markdown
          </a>
        </h2>
        <p>
          Pass a string of markdown content as <code>optionLabelmarkdown</code> and it will be rendered inside the label element for the option.
        </p>

        <RadioButtonGroupExampleThreeDemo />
        <h2
          id="option-label-content-with-a-custom-component"
          class="docs-md__h2"
        >
          <a
            href="#option-label-content-with-a-custom-component"
            class="heading-anchor"
          >
            Option label content with a custom component
          </a>
        </h2>
        <p>When using a custom component for option labels, either by:</p>
        <ul class="docs-list-disc">
          <li>
            passing <code>optionLabelComponent</code> to the field. The component passed will then be rendered in place of the standard label element for each option.
          </li>
          <li>
            by passing <code>labelComponent</code> to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override <code>optionLabelComponent</code>.
          </li>
        </ul>
        <p>In both cases the following applies, the object passed must take the following form.</p>
        <pre class="docs-md__code">
          <code>&#123; componentClass: // Class, required. The imported class of the component to render. props: // Object, optional. This object that will be passed to the component as "props" &#125;</code>
        </pre>
        <ul class="docs-list-disc">
          <li>
            The component template will have access to the <code></code> boolean as well as the <code></code> hash which includes the <code>label</code> and <code>value</code> props for that option.
          </li>
          <li>
            Accessibility features
            <ul class="docs-list-disc">
              <li>
                Set <code>for=</code> on the label element, to ensure that the browser knows which radio button the label is for.
              </li>
              <li>
                Set <code>id=</code> so that the <code>aria-labelledby</code> attribute on the radio button works correctly.
              </li>
            </ul>
          </li>
        </ul>

        <RadioButtonGroupExampleTwoDemo />
      </div>
    </>
  );
}
