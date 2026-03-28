import CustomFieldUsageDemo from '../components/demos/CustomFieldUsageDemo.jsx';
import ValidationBasicsDemo from '../components/demos/ValidationBasicsDemo.jsx';
import ValidationEventsDemo from '../components/demos/ValidationEventsDemo.jsx';
import ForcingValidationDemo from '../components/demos/ForcingValidationDemo.jsx';
import FieldMethodsExampleFiveDemo from '../components/demos/FieldMethodsExampleFiveDemo.jsx';
import SignupFormDemo from '../components/demos/SignupFormDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';
import { Link } from 'react-router-dom';

export default function FieldValidation() {
  return (
    <>
      <div className="docs-md">
        <h1 id="field-validation" class="docs-md__h1">
          Field validation
        </h1>
        <h2 id="integrating-validator-functions" class="docs-md__h2">
          <a href="#integrating-validator-functions" class="heading-anchor">
            Integrating validator functions
          </a>
        </h2>
        <p>
          Validator functions need to be included in an instance of a{' '}
          <code>ChangesetWebform</code> component in order for the corresponding
          validation rules to work. This can be done globally, or for each
          instance of the component.
        </p>
        <h3 id="importing-all-of-the-default-validators" class="docs-md__h3">
          <a
            href="#importing-all-of-the-default-validators"
            class="heading-anchor"
          >
            Importing all of the default validators
          </a>
        </h3>
        <p>
          The full set of default validators shipped by{' '}
          <a
            href="https://github.com/adopted-ember-addons/ember-changeset-validations"
            class="docs-md__a"
          >
            Ember Changeset Validations
          </a>{' '}
          can be imported as below.
        </p>

        <DocsSnippet
          name="import-default-validators.js"
          title="Importing the default validator functions"
        />
        <h3 id="importing-a-subset-of-default-validators" class="docs-md__h3">
          <a
            href="#importing-a-subset-of-default-validators"
            class="heading-anchor"
          >
            Importing a subset of default validators
          </a>
        </h3>
        <p>
          Note that we can also import a subset of validations, if we don't
          intend on using all of the default ones, and we'd prefer to avoid
          importing validators that we don't need.
        </p>
        <p>
          The snippet below shows the full set of default validators imported in{' '}
          <code>ember-changeset-webforms/utils/default-validators</code> (Used
          above). Rather than importing the default validators, we could import
          a subset of those shown below.
        </p>

        <DocsSnippet
          name="ember-changeset-validations-default-validators.js"
          title="The full set of default validators"
        />
        <h3 id="importing-custom-validators" class="docs-md__h3">
          <a href="#importing-custom-validators" class="heading-anchor">
            Importing custom validators
          </a>
        </h3>
        <p>
          Custom validators can be imported from anywhere. See{' '}
          <Link to="/docs/integrating-custom-validators">
            Integrating custom validators
          </Link>
        </p>
        <h3 id="integrating-validator-functions-app-wide" class="docs-md__h3">
          <a
            href="#integrating-validator-functions-app-wide"
            class="heading-anchor"
          >
            Integrating validator functions app wide
          </a>
        </h3>
        <p>
          Validators can be added at the app wide level in{' '}
          <code>services/ember-changeset-webfornms.js</code> as below. We first
          import the validators in the service as above and then add them to the{' '}
          <code>changesetWebformsDefaults</code> object as below.
        </p>

        <DocsSnippet
          name="app-wide-validators.js"
          title="Including validators app wide"
        />
        <p>
          This would result in all of the default validators being available in
          all instances of the <code>ChangesetWebform</code> component
          throughout our app.
        </p>
        <h3
          id="integrating-validator-functions-in-an-individual-form"
          class="docs-md__h3"
        >
          <a
            href="#integrating-validator-functions-in-an-individual-form"
            class="heading-anchor"
          >
            Integrating validator functions in an individual form
          </a>
        </h3>
        <p>
          The example component below shows how the custom{' '}
          <code>phoneNumber</code> validator can be imported and then made
          available to a single instance of the <code>ChangesetWebform</code>{' '}
          component, by including it in <code>formSchema.validations</code>.
        </p>
        <p>
          Note that if you've specified app wide validators, as in the above
          example, those will still be available to this instance of the{' '}
          <code>ChangesetWebform</code> component. This is why{' '}
          <code>validatePresence</code> still works, even though it is not
          included in <code>formSchema.validations</code>.
        </p>

        <CustomFieldUsageDemo />
        <h2 id="defining-validation-rules" class="docs-md__h2">
          <a href="#defining-validation-rules" class="heading-anchor">
            Defining validation rules
          </a>
        </h2>
        <p>
          This addon uses{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations"
            class="docs-md__a"
          >
            Ember Changeset Validations
          </a>{' '}
          to handle validation, and also as its default library of validators.
        </p>
        <p>
          The{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations#usage"
            class="docs-md__a"
          >
            Ember Changeset Validations usage documentation
          </a>{' '}
          outlines how you create a validation map and then pass that map to the
          changeset generator, so that the validations are integrated into your
          changeset.
        </p>
        <p>
          With <strong>Ember Changeset Webforms</strong> the importing of the
          validations library, construction of the validations map and creation
          of the changeset are handled for you.
        </p>
        <p>
          You need only specify the validations that you'd like to apply to each
          field in the <code>validationRules</code> array.
        </p>
        <p>
          Each item in a field's <code>validationRules</code> array is an object
          that must contain a <code>validationMethod</code> property, which must
          correspond to a validation rule in the{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations#validator-api"
            class="docs-md__a"
          >
            Ember Changeset Validations validator api
          </a>
          , or any custom validators that you have written (More on custom
          validators below).
        </p>
        <p>
          Each item in a field's <code>validationRules</code> array may also
          include an <code>arguments</code> property, where you can pass the
          arguments relevant to the validator specified by the{' '}
          <code>validationMethod</code>.
        </p>
        <p>
          Thus, the code below taken from the{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations#usage"
            class="docs-md__a"
          >
            Ember Changeset Validations usage docs
          </a>{' '}
          on create a validations map:
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            {' '}
            <span class="hljs-attr">firstName</span>: [
            <span class="hljs-title function_">validatePresence</span>(
            <span class="hljs-literal">true</span>),
            <span class="hljs-title function_">validateLength</span>(&#123;{' '}
            <span class="hljs-attr">min</span>:{' '}
            <span class="hljs-number">4</span> &#125;) ],
          </code>
        </pre>
        <p>
          would be expressed as the below when defining a formSchema for the
          changeset-webform component.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-attr">validationRules</span>: [ &#123;
            <span class="hljs-attr">validationMethod</span>:{' '}
            <span class="hljs-string">&#x27;validatePresence&#x27;</span>,
            <span class="hljs-attr">arguments</span>:{' '}
            <span class="hljs-literal">true</span>, &#125;, &#123;
            <span class="hljs-attr">validationMethod</span>:{' '}
            <span class="hljs-string">&#x27;validateLength&#x27;</span>,
            <span class="hljs-attr">arguments</span>: &#123;{' '}
            <span class="hljs-attr">min</span>:{' '}
            <span class="hljs-number">4</span> &#125;, &#125;, ];
          </code>
        </pre>
        <p>
          The example below shows a basic implementation of the{' '}
          <code>validatePresence</code>, <code>validateFormat</code> and{' '}
          <code>validateLength</code> validators.
        </p>

        <ValidationBasicsDemo />
        <h2 id="validation-events" class="docs-md__h2">
          <a href="#validation-events" class="heading-anchor">
            Validation events
          </a>
        </h2>
        <p>
          In addition to defining validation rules, we can also configure which
          events should trigger field validation. The addon provides some sane
          defaults, so that we don't have to configure obvious validation events
          over and over.
        </p>
        <p>
          Note that we're not referring to browser events here, but customised
          event names which the built in fields send as the first argument to
          the <code>onUserInteraction</code> action, when the user takes the
          related action.
        </p>
        <p>
          Validation events are specified in the <code>validatesOn</code>{' '}
          property of a field.
        </p>
        <h3 id="validation-event-names-for-built-in-fields" class="docs-md__h3">
          <a
            href="#validation-event-names-for-built-in-fields"
            class="heading-anchor"
          >
            Validation event names for built in fields
          </a>
        </h3>
        <p>
          The snippet below shows all of the available event names which can be
          passed to the <code>validatesOn</code> array for a field.
        </p>
        <p>
          Those which are shown under <code>Included by addon defaults</code>{' '}
          are included in the <code>validatesOn</code> array of the field's
          definition in addon config.
        </p>
        <p>
          Such events will trigger validation by default, and do not need to be
          added to the <code>validatesOn</code> array for a field in our app of
          component config.
        </p>
        <p>
          Those under <code>Not included by addon defaults</code> need to be
          included in app or component config if we would like them to trigger
          validation.
        </p>
        <p>TODO InterpolatedSimpleJsSnippet</p>
        <h3 id="customising-validation-events-for-a-field" class="docs-md__h3">
          <a
            href="#customising-validation-events-for-a-field"
            class="heading-anchor"
          >
            Customising validation events for a field
          </a>
        </h3>
        <p>
          The example below shows three scenrios when defining validation
          events.
        </p>
        <ol class="docs-list-decimal">
          <li>
            The <code>name</code> field has no <code>validatesOn</code>{' '}
            property, and so the field uses the defaults. Therefore, it
            validates on <code>focusOut</code> but not <code>keyUp</code>.
          </li>
          <li>
            The <code>email</code> field overrides the <code>validatesOn</code>{' '}
            property. Therefore, it only validates on <code>keyUp</code> and
            does not validate on <code>focusOut</code>.
          </li>
          <li>
            The <code>phoneNumber</code> field adds <code>keyUp</code> to the{' '}
            <code>validatesOn</code> property. This is achieved by including the
            srting <code>$inherited</code> in the array for{' '}
            <code>validatesOn</code>. Therefore, it validates both on{' '}
            <code>focusOut</code> and <code>keyUp</code>.
          </li>
        </ol>

        <ValidationEventsDemo />
        <p>
          The addon defaults outlined above can be overridden at the app level,
          or within a particular form schema. See{' '}
          <Link to="/docs/configuration-options">Configuration options</Link>.
        </p>
        <h3 id="forcing-validation-in-an-action" class="docs-md__h3">
          <a href="#forcing-validation-in-an-action" class="heading-anchor">
            Forcing validation in an action
          </a>
        </h3>
        <p>
          Under the hood, each field has property called <code>eventLog</code>,
          an array which is populated with the names of all the validation
          events which have occurred. For example when a user types in an input
          field, the field's <code>eventLog</code> property will have the
          strings <code>focusIn</code>, <code>keyDown</code>, and{' '}
          <code>keyUp</code> added to it.
        </p>
        <p>
          If there is any intersection between the <code>eventLog</code> and{' '}
          <code>validatesOn</code> properties, the field's validation is
          activated.
        </p>
        <p>
          The addon defaults include <code>forceValidation</code> in a field's{' '}
          <code>validatesOn</code> property.
        </p>
        <p>
          Thus, you can forcibly activate a field's validation by pushing the
          string <code>forceValidation</code> into <code>field.eventLog</code>,
          as shown in terh <code>updateNameField</code> action in the example
          below.
        </p>

        <ForcingValidationDemo />
        <h3 id="using-your-own-validation-event-names" class="docs-md__h3">
          <a
            href="#using-your-own-validation-event-names"
            class="heading-anchor"
          >
            Using your own validation event names
          </a>
        </h3>
        <p>
          The example below shows how you can trigger validation in customised
          ways by adding an event string to the <code>validatesOn</code> array
          of a field, and then pushing the same string into the{' '}
          <code>eventLog</code> array of the field when it should be validated.
        </p>
        <p>
          In the example below, clicking the "Update value of name field" button
          updates the value of the name field, and validates the field by
          pushing the custom event name <code>valueExternallyUpdated</code> into{' '}
          <code>eventLog</code>. This works because{' '}
          <code>valueExternallyUpdated</code> is added to the the{' '}
          <code>validatesOn</code> property of the field.
        </p>

        <FieldMethodsExampleFiveDemo />
        <h2 id="setting-custom-validity-on-dom-elements" class="docs-md__h2">
          <a
            href="#setting-custom-validity-on-dom-elements"
            class="heading-anchor"
          >
            Setting custom validity on DOM elements
          </a>
        </h2>
        <p>
          Browsers will automatically apply the <code>valid</code> and{' '}
          <code>invalid</code> pseudo classes to form elements where
          appropriate. For example, if an input field with{' '}
          <code>type=email</code> is updated with an invalid email address, the
          input will then have the <code>invalid</code> pseudo class, and will
          be selectable with <code>:invalid</code>.
        </p>
        <p>
          DOM elements have a built in <code>setCustomValidity</code> method
        </p>
        <p>
          See{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity"
            class="docs-md__a"
          >
            https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity
          </a>
        </p>
        <p>
          <code>data-set-custom-validity</code>
        </p>
        <h2 id="example" class="docs-md__h2">
          <a href="#example" class="heading-anchor">
            Example
          </a>
        </h2>

        <SignupFormDemo />
      </div>
    </>
  );
}
