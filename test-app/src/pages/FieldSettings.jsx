import FieldSettingsCustomParserDemo from '../components/demos/FieldSettingsCustomParserDemo.jsx';
import ClickerExampleTwoFormSchema from '../components/forms/ClickerExampleTwoFormSchema.jsx';
import { DocsSnippet } from '../components/docs-utils';

export default function FieldSettings() {
  return (
    <>
      <div className="docs-md">
        <h1 id="field-settings" class="docs-md__h1">
          Field settings
        </h1>
        <h2 id="generic-field-settings" class="docs-md__h2">
          <a href="#generic-field-settings" class="heading-anchor">
            Generic field settings
          </a>
        </h2>
        <p>
          Generic field settings are those which apply to all form fields,
          regardless of the type of field or the internal markup which is
          rendered within it.
        </p>
        <p>The default settings are listed below with their values.</p>
        <p>
          Generic field settings can be tweaked for all the fields in one
          instance of a <code>changesetWebform</code> component, in the{' '}
          <code>fieldSettings</code> object at the root of your formSchema.
        </p>
        <p>
          Note that any of these settings can be overridden in one of the field
          objects in the <code>formSchema.fields</code> array.
        </p>

        <DocsSnippet
          name="generic-field-settings.js"
          title="Default generic field settings and their values"
        />
        <h2 id="tracked-field-settings" class="docs-md__h2">
          <a href="#tracked-field-settings" class="heading-anchor">
            Tracked field settings
          </a>
        </h2>
        <p>
          The following field settings are tracked, and so updating them in an
          action will result in a template update.
        </p>

        <DocsSnippet
          name="field-settings-tracked-props.js"
          title="Tracked field settings"
        />
        <h2 id="custom-tracked-props" class="docs-md__h2">
          <a href="#custom-tracked-props" class="heading-anchor">
            Custom tracked props
          </a>
        </h2>
        <p>
          If you need to add custom tracked properties to a field, you can add
          them to a class definition, adding any tracked properties to that
          class definition.
        </p>
        <p>
          Then add an instance of that class as the <code>externalProps</code>{' '}
          property of a formField or formFieldClone.
        </p>
        <p>// TODO test and document this better.</p>
        <p>
          In the example below, we need a tracked property{' '}
          <code>showAdvanced</code> in ourt form field, so that we can update
          the custom clicker component to toggle between an up and down arrow
          when the button is clicked.
        </p>
        <p>
          In the case we've created a class definition called{' '}
          <code>customProps</code> with a tracked property of{' '}
          <code>showAdvanced</code>.
        </p>

        <ClickerExampleTwoFormSchema />
        <h3 id="the-customparser-method" class="docs-md__h3">
          <a href="#the-customparser-method" class="heading-anchor">
            The <code>customParser</code> method
          </a>
        </h3>
        <p>
          Custom parsers can be used to manipulate field definitions that are
          passed to the <code>fields</code> array in a <code>formSchema</code>.
          The <code>customParser</code> method is run at the very end of
          generating the form field instance, after all defaults have been
          applied.
        </p>
        <p>
          It receives a single argument, <code>field</code> and must also return
          the <code>field</code>.
        </p>
        <p>
          You can define a <code>customParser</code> method for all fields by
          adding it to the <code>changesetWebformsDefaults.fieldSettings</code>{' '}
          in <code>services/ember-changeset-webforms.js</code>.
        </p>
        <p>
          You can also define <code>customParser</code> for a specific field
          type, in the relevant object in{' '}
          <code>changesetWebformsDefaults.fieldTypes</code> in{' '}
          <code>services/ember-changeset-webforms</code>.
        </p>

        <FieldSettingsCustomParserDemo />
      </div>
    </>
  );
}
