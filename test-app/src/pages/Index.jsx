import SignupFormDemo from '../components/demos/SignupFormDemo.jsx';

export default function Index() {
  return (
    <>
      <div className="docs-md">
        <h1 id="what-is-ember-changset-webforms" class="docs-md__h1">
          What is Ember Changset Webforms
        </h1>
        <p>
          <strong>Ember Changset Webforms</strong> integrates convenient,
          flexible and feature rich templates and action handling with the
          immensely powerful{' '}
          <a
            href="https://github.com/poteto/ember-changeset"
            class="docs-md__a"
          >
            Ember Changeset
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/poteto/ember-changeset-validations"
            class="docs-md__a"
          >
            Ember Changeset Validations
          </a>
          .
        </p>
        <p>
          Simply define a form schema as a "plain old JavaScript object", which
          includes an array of <code>fields</code>, each with options for UI and
          validation.
        </p>
        <p>
          This schema can then be passed to the <code>ChangesetWebform</code>{' '}
          component in order to render a form, as below. The creation of the
          changeset, with its associated validators, is handled by the
          component, so that you need only think about what fields you would
          like to include in a webform, and how and when they should be
          validated.
        </p>
        <p>
          The rendered form can also be pre populated with data, by passing a
          plain Javascript object, an Ember object,or Ember Data model as its{' '}
          <code>@data</code> property.
        </p>
        <h2 id="example" class="docs-md__h2">
          <a href="#example" class="heading-anchor">
            Example
          </a>
        </h2>

        <SignupFormDemo />
        <h2 id="features" class="docs-md__h2">
          <a href="#features" class="heading-anchor">
            Features
          </a>
        </h2>
        <ul class="docs-list-disc">
          <li>
            Define your form schema as plain old JavaScript object, and the{' '}
            <code>ChangesetWebform</code> component will render the form.
          </li>
          <li>
            The addon provides 11 default fields, and allows for the creation of
            custom fields whgich can then easily be used throughout your
            application.
          </li>
          <li>
            You can define a field as clonable, allowing the end user to add or
            remove instances of the field.
          </li>
          <li>
            You have fine grained control over CSS classes at global, form and
            individual field level.
          </li>
          <li>
            The addon integrates all of the validation methods which are part of{' '}
            <a
              href="https://github.com/poteto/ember-changeset-validations"
              class="docs-md__a"
            >
              Ember Changeset Validations
            </a>{' '}
            by default, and makes it easy to define and integrate custom
            validators.
          </li>
          <li>
            You can pass an array of validation event names, to control when
            validation happens for a specific field- these are{' '}
            <code>keyUp</code>, <code>insert</code>, <code>focusOut</code> and{' '}
            <code>onChange</code>.
          </li>
          <li>
            The addon provides several action hooks, allowing your app to
            respond to user interactions in various ways.
          </li>
          <li>
            Conditional fields - only allow a field to show if another field has
            a certain value, but updating its <code>omitted</code> setting.
            Fields which are omitted are not validated and they are not included
            in the data submitted by the form.
          </li>
          <li>
            Fine grained configuration control. Configuration options can be set
            at the app level, form level and, where appropriate, at field level.
          </li>
          <li>
            Configurable CSS class names - configure the class names applied to
            form controls such as inputs or buttons, to alow for seamless
            styling integration with libraries such as Bootstrap.
          </li>
        </ul>
      </div>
    </>
  );
}
