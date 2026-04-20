import ClickerExampleOneFormSchemaDemo from '../../../components/forms/ClickerExampleOneFormSchemaDemo.jsx';
import ClickerExampleTwoFormSchemaDemo from '../../../components/forms/ClickerExampleTwoFormSchemaDemo.jsx';

export default function Clicker() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="clicker"
          class="docs-md__h1"
        >
          Clicker
        </h1>
        <p>
          The field displays an element which emits the <code>onUserInteraction</code> action with the eventName <code>click</code> when clicked. You can bind this to an action in your component and then respond in any way.
        </p>
        <p>The examples below toggle the advanced field in a form.</p>
        <h2
          id="clicker-field-basic-usage"
          class="docs-md__h2"
        >
          <a
            href="#clicker-field-basic-usage"
            class="heading-anchor"
          >
            Clicker field basic usage
          </a>
        </h2>
        <p>
          Pass <code>clickerText</code> and optionally <code>clickerElementClassNames</code>.
        </p>
        <p>
          Renders a <code>div</code> element with <code>role="button"</code> the classNames provided. The inner text of the element is what is passed to <code>clickerText</code>.
        </p>

        <ClickerExampleOneFormSchemaDemo />
        <h2
          id="clicker-field-with-a-custom-component"
          class="docs-md__h2"
        >
          <a
            href="#clicker-field-with-a-custom-component"
            class="heading-anchor"
          >
            Clicker field with a custom component
          </a>
        </h2>
        <p>
          You can use a custom component for the checkbox label by passing <code>displayComponent</code> to the field. The component passed will then be rendered in place of the standard clicker component.
        </p>
        <p>
          The clickable elemnt must call the <code>@onClick</code> action, which is passed to it by the <code>changesetWebform</code> component. See <code>Custom clicker component template</code> int he example below.
        </p>
        <p>The object passed must take the following form.</p>
        <pre class="docs-md__code">
          <code>&#123; componentClass: // Class, required. The imported class of the component to render. props: // Object, optional. This object that will be passed to the component as "props" &#125;</code>
        </pre>
        <ul class="docs-list-disc">
          <li>
            The component will also have access to an <code>formField</code> prop, with the formField object.
          </li>
          <li>
            The component can also apply <code>...attributes</code> to the element that should receive the class names configured for the <code>clickerElement</code> name space.
          </li>
          <li>
            The component will also have access to the <code>changesetWebform</code> object, which is contains the form settings, form fields and underlying changeset.
          </li>
        </ul>
        <p>
          Pass <code>displayComponent</code> as an object containing:
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>path</code> - the path to the component to render
          </li>
          <li>
            <code>props</code>
          </li>
        </ul>
        <p>
          If using a <code>button</code> element in your custom clicker component, bear in mind that the default <code>type</code> of a button is <code>submit</code>. Thus, if you don't add a type to your button, clicking it will result in a form submission. Setting <code>type="button"</code> is recommended.
        </p>

        <ClickerExampleTwoFormSchemaDemo />
      </div>
    </>
  );
}
