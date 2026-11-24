import CustomFieldUsageDemo from '../../../../components/demos/CustomFieldUsageDemo.jsx';
import CustomFieldDemo from '../../../../components/demos/CustomFieldDemo.jsx';
import CustomFieldUsageTwoDemo from '../../../../components/demos/CustomFieldUsageTwoDemo.jsx';
import { DocsSnippet } from '../../../../components/docs-utils';
import Link from 'next/link';

export default function CreatingCustomFields() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="creating-custom-fields"
          class="docs-md__h1"
        >
          Creating custom fields
        </h1>
        <h2
          id="overview"
          class="docs-md__h2"
        >
          <a
            href="#overview"
            class="heading-anchor"
          >
            Overview
          </a>
        </h2>
        <p>
          You can create your own custom fields by simply creating a component will all the required markup and behavious, and then adding an entry to <code>changesetWebformsDefaults.fieldTypes</code> in <code>config/environment.js</code>, where you provide a namepace for the new field, and give the path to the component as <code>componentClass</code>.
        </p>
        <h2
          id="example-usage"
          class="docs-md__h2"
        >
          <a
            href="#example-usage"
            class="heading-anchor"
          >
            Example usage
          </a>
        </h2>
        <p>This example is going to create a custom phone number field, which allows the user to select a country code and then type in the rest of the phone number.</p>
        <p>The field emits its value is a single string, and will have a custom validator which will check that both the country code and number are present, and that the number is formatted correctly.</p>
        <p>The demo below shows the code that would be used to add the field to a formSchema.</p>

        <CustomFieldUsageDemo />

        <h2
          id="defining-the-field"
          class="docs-md__h2"
        >
          <a
            href="#defining-the-field"
            class="heading-anchor"
          >
            Defining the field
          </a>
        </h2>
        <p>
          Create a service named <code>ember-changeset-webforms.js</code>.
        </p>
        <p>
          We add an entry to the <code>changesetWebformsDefaults.fieldTypes</code> array in our <code>services/ember-chnageset-webforms.js</code>, with a fieldType of <code>phoneNumberWithCountryCode</code>. The only other required field is <code>componentClass</code>, the imported class definition of our custom field component. We can add any other default field options that we would like to.
        </p>
        <p>
          In this case we add some default class names to the <code>fieldControls</code> element which wraps all fields. See <Link href="/docs/manipulating-element-class-names-and-attrs">docs.manipulating-element-class-names-and-attrs</Link>.
        </p>
        <p>
          We also add class name defaults for <code>phoneNumberInput</code> and <code>countryCodeTrigger</code>. We will tell out component which element these classnames should using the <code>class-names-from-config</code> helper (See below).
        </p>
        <p>
          The <code>alwaysValidatesOn</code> array allows us to specify events that will always trigger field validation, even if that event is not included in the <code>validatesOn</code> array where the field is onvoked in a formSchema.
        </p>
        <p>
          Note that the addon will always force field validation on <code>submit</code>, so there is no need to include it.
        </p>

        <DocsSnippet
          name="custom-field-definition.js"
          title="services/ember-changeset-webforms.js"
          language="javascript"
        />
        <h2
          id="creating-the-custom-field"
          class="docs-md__h2"
        >
          <a
            href="#creating-the-custom-field"
            class="heading-anchor"
          >
            Creating the custom field
          </a>
        </h2>
        <p>
          The important thing to note here is that your component can be absolutely anything that you want it to, and can call <code>this.args.updateFieldValue</code> in order to update the field and the underlying changeset property.
        </p>
        <p>
          For fine grained control of when the fields validation should become activated, you can also call <code>this.args.onUserInteraction</code> in response to any user interaction events you choose.
        </p>

        <CustomFieldDemo />
        <h2
          id="the-component-template"
          class="docs-md__h2"
        >
          <a
            href="#the-component-template"
            class="heading-anchor"
          >
            The component template
          </a>
        </h2>
        <p>
          The component template simply inserts a{' '}
          <a
            href="https://ember-power-select.com"
            class="docs-md__a"
          >
            Power Select
          </a>{' '}
          component for selecting the country code, and then a text input for entering the rest of the phone number.
        </p>
        <h3
          id="accessing-field-value"
          class="docs-md__h3"
        >
          <a
            href="#accessing-field-value"
            class="heading-anchor"
          >
            Accessing field value
          </a>
        </h3>
        <p>
          The value of the field, as derived from the underlying changeset property, can be accessed as the <code>fieldValue</code> property of ther form field.
        </p>
        <p>
          In the example below, we use the getter <code>fieldValueObject</code> to create an object out of <code>this.args.formField.filedValue</code>, as different form elements contain different parts of the value. For example, the input's value is set to <code>this.fieldValueObject.phoneNumber</code>.
        </p>
        <h3
          id="handling-browser-events"
          class="docs-md__h3"
        >
          <a
            href="#handling-browser-events"
            class="heading-anchor"
          >
            Handling browser events
          </a>
        </h3>
        <p>In response to the relevant browser events, the two power select and input call the following component actions:</p>
        <ul class="docs-list-disc">
          <li>
            <code>codeSelected</code>
          </li>
          <li>
            <code>inputFocusOut</code>
          </li>
          <li>
            <code>inputFocusIn</code>
          </li>
          <li>
            <code>inputKeyUp</code>
          </li>
          <li>
            <code>inputChange</code>
          </li>
        </ul>
        <h3
          id="using-the-attrs-from-config-hook-to-add-attributes-from-config"
          class="docs-md__h3"
        >
          <a
            href="#using-the-attrs-from-config-hook-to-add-attributes-from-config"
            class="heading-anchor"
          >
            Using the <code>attrs-from-config</code> hook to add attributes from config
          </a>
        </h3>
        <p>TODO inline example</p>
        <p>
          The <code>attrs-from-config</code> hook receives three arguments:
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>propName</code> (required) - the property of the classNames config object to get element class names from (See <Link href="/docs/manipulating-element-class-names-and-attrs">docs.manipulating-element-class-names-and-attrs</Link>)
          </li>
          <li>
            <code>changesetWebform</code> (required) - the changeset webform instance. Accessible in the template via the <code>@changesetWebform</code> prop.
          </li>
          <li>
            @formField (required) - the formField instance. Accessible in the template via the <code>@formField</code> prop.
          </li>
        </ul>
        <p>
          The <code>attrs-from-config</code> hook does the following:
        </p>
        <ul class="docs-list-disc">
          <li>finds the array of class names from config which are assigned to the namespace passed in the first argument, and adds those to the element.</li>
          <li>
            if <code>$validationClassNames</code> is one of the items in the array of class names, it also updates the element classes to include or exclude the validation classes, in accordance with the validation status of the field. The validation classes are defined in the the <code>validClassNames</code> and <code>invalidClassNames</code> props of the class names config.
          </li>
          <li>
            if <code>$validationPseudoClasses</code> is one of the items in the array of class names, <em>and</em> the element in question is a form element, the modifier will add <code>data-set-custom-validity=true</code> to the element. Then, whenever the field is validated, all elements within that field with <code>data-set-custom-validity=true</code> will have their{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity"
              class="docs-md__a"
            >
              <code>setCustomValidity</code>
            </a>{' '}
            method called with any validation errors. This allows the broweser to add the <code>:valid</code> or <code>:invalid</code> pseudo classes to the elements as appropriate.
          </li>
        </ul>
        <p>See the example in the input field in the example below.</p>

        <CustomFieldDemo />
        <h3
          id="invoking-class-names-from-config-where-a-modifier-can-39-t-work"
          class="docs-md__h3"
        >
          <a
            href="#invoking-class-names-from-config-where-a-modifier-can-39-t-work"
            class="heading-anchor"
          >
            Invoking class names from config where a modifier can't work
          </a>
        </h3>
        <p>
          It might not always be appropriate or possible to use the <code>attr-from-config</code> modifier to add classes to an element. This is especially true when you don't have access to the elements within a component.
        </p>
        <p>
          The <code>@triggerClass</code> property of the <code>PowerSelect</code> component is a good example. We're not able to invoke the <code>attrs-from-config</code> modifier on the trigger component, because it's inside the PowerSelect component, which we don't have access to.
        </p>
        <p>
          In the case, we can invoke class names from config by using the <code>ember-changeset-webforms/class-names-from-config</code> helper. See the <code>@triggerClass</code> prop in the example below. This helper simply returns the class names as a space separated string.
        </p>

        <DocsSnippet name="custom-field-component.hbs" />
        <p>
          Notice the use of the <code>ember-changeset-webforms/class-names-from-config</code>, both as <code>@triggerClass</code> on the power select, and <code>class</code> on the input. The example below would output the classnames found in <code>classNames.countryCodeTrigger</code> in the fields options, because <code>countryCodeTrigger</code> is the first argument passed to the helper.
        </p>
        <pre class="docs-md__code">
          <code class="language-handlebars">@triggerClass=""</code>
        </pre>
        <p>Of course you could hard code the class names into your template if you don't care about having the option to override them, but doing it this way gives you the ability to override these class names in any particular usage of the field.</p>
        <p>This is especially helpful if your creating your cusrtom fielsd in an addon, as the consuming app could then override these settings at at app wide level as well.</p>
        <h3
          id="other-attributes"
          class="docs-md__h3"
        >
          <a
            href="#other-attributes"
            class="heading-anchor"
          >
            Other attributes
          </a>
        </h3>
        <p>In some cases the attributes of a form element in your custom field may have corresponsing field properties.</p>
        <p>For example, the phone number input uses formField properties to set attribute sint he following way:</p>
        <pre class="docs-md__code">
          <code class="language-handlebars">readonly= disabled= required= name=</code>
        </pre>
        <h3
          id="accessibility"
          class="docs-md__h3"
        >
          <a
            href="#accessibility"
            class="heading-anchor"
          >
            Accessibility
          </a>
        </h3>
        <p>In our example, both the power select component and the input have the following aria properties added:</p>
        <pre class="docs-md__code">
          <code class="language-handlebars">ariaLabelledBy= aria-label= aria-errormessage= aria-describedby=</code>
        </pre>
        <p>These are passed into the component for you, and you only need to add them to the relevant elements in your custom field, exactly as they appear above. The field label, description and error elements of the field will automatically have the corresponding ids, allowing all the the above attrionutes to work correctly with screen readers.</p>
        <h3
          id="focussing-and-unfocussing-the-field"
          class="docs-md__h3"
        >
          <a
            href="#focussing-and-unfocussing-the-field"
            class="heading-anchor"
          >
            Focussing and unfocussing the field
          </a>
        </h3>
        <p>
          At any point your component can set <code>this.args.formField.focussed</code> equal to <code>true</code> or <code>false</code>. Unless the fields <code>showValidationWhenFocussed</code> property is true, all validation UI will be omitted on the field for as long as the fields <code>focussed</code> property is <code>true</code>.
        </p>
        <p>
          In the example below, we set <code>focussed</code> to true when the text input is focussed.
        </p>
        <h2
          id="action-handling"
          class="docs-md__h2"
        >
          <a
            href="#action-handling"
            class="heading-anchor"
          >
            Action handling
          </a>
        </h2>
        <h3
          id="updatefieldvalue"
          class="docs-md__h3"
        >
          <a
            href="#updatefieldvalue"
            class="heading-anchor"
          >
            updateFieldValue
          </a>
        </h3>
        <p>
          In order to update the value of the field, you must call <code>this.args.updateFieldValue</code> passing the new field value as the only argument. This has several knock on effects, including
        </p>
        <ul class="docs-list-disc">
          <li>updating the associated property on the changeset</li>
          <li>
            adding <code>valueUpdated</code> to the eventLog of the field
          </li>
          <li>triggering field validation,</li>
          <li>
            triggering the external <code>onFieldValueChange</code> action. // TODO link
          </li>
        </ul>
        <p>In our example, we call this action from 3 different component actions:</p>
        <ul class="docs-list-disc">
          <li>
            <code>inputKeyUp</code>, and <code>inputChange</code> which are in turn bound to the inherent "change" and "keyup" input event via the <code>on</code> modifer.
          </li>
          <li>
            <code>codeSelected</code> which is bound to the <code>onChange</code> property of the power select component.
          </li>
        </ul>
        <p>
          In each case, the value sent as the only argument is the string returned by <code>updatedFieldValue</code>, which updates either the countryCode or phoneNumber and returns the concatenated string.
        </p>
        <h3
          id="onuserinteraction"
          class="docs-md__h3"
        >
          <a
            href="#onuserinteraction"
            class="heading-anchor"
          >
            onUserInteraction
          </a>
        </h3>
        <p>
          Your custom field component can optionally also call <code>this.args.onUserInteraction</code> in response to any user events of your choosing. It takes the following arguments:
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>eventName</code> - required - any string. This string will be added to the <code>eventLog</code> array of the field, and if the same event name is included in the fields <code>validatesOn</code> array, then validation will be activated for the field.
          </li>
          <li>
            <code>value</code> - optional - the value of the individual element that the event has occurred on. For custom fields with multiple form elements this may not be the value of the field as a whole.
          </li>
          <li>
            <code>event</code> - optional - the browser event object.
          </li>
        </ul>
        <p>
          Calling <code>this.args.onUserInteraction</code> from your custom field will also trigger the external <code>onUserInteraction</code> action // TODO link.
        </p>
        <p>
          In our example <code>this.args.onUserInteraction</code> is called 3 times, with the only argument being one of <code>keyUpPhoneNumberInput</code>, <code>focusOutPhoneNumberInput</code>, or <code>countryCodeSelected</code>.
        </p>
        <p>
          This means that is any of <code>keyUpPhoneNumberInput</code>, <code>focusOutPhoneNumberInput</code>, or <code>countryCodeSelected</code> are include in the <code>validatesOn</code> array of the field definition where the field is added to a form schema, the fields validation will be activated as soon as <code>this.args.onUserInteraction</code> with the corrtesponding argument.
        </p>
        <p>
          In the usage example below, we see that <code>focusOutPhoneNumberInput</code> is the only string in the <code>validatesOn</code> array for the <code>phoneNumber</code> field. This means that:
        </p>
        <ul class="docs-list-disc">
          <li>the field does not validate if the user first selects a country code. This avoids an annoying validation error about requiring the phone number before the user has had a chance to fill it in.</li>
          <li>the field validates when the user focusses out of the input, whether there is any text entered or not.</li>
          <li>once a fields validation is activated by a focus out event, it will revalidate whenever it's value is changed, including when a new country code is selected.</li>
        </ul>
        <h2
          id="validation"
          class="docs-md__h2"
        >
          <a
            href="#validation"
            class="heading-anchor"
          >
            Validation
          </a>
        </h2>
        <h3
          id="when-validateson-is-not-included-in-the-field-invocation"
          class="docs-md__h3"
        >
          <a
            href="#when-validateson-is-not-included-in-the-field-invocation"
            class="heading-anchor"
          >
            When <code>validatesOn</code> is not included in the field invocation
          </a>
        </h3>
        <p>
          We can see in the example below that the field invocation does not have a <code>validatesOn</code> array.
        </p>
        <p>In this case, the field will validate on:</p>
        <ul class="docs-list-disc">
          <li>
            <code>submit</code> =: this is inherited from the top level addon default, due to <code>$inherited</code> being included in the <code>alwaysValidatesOn</code> array in the field definition.
          </li>
          <li>
            <code>focusOutPhoneNumberInput</code> which is the only item in the <code>alwaysValidatesOn</code> array in the field definition.
          </li>
        </ul>

        <CustomFieldUsageDemo />
        <h3
          id="when-validateson-is-included-in-the-field-invocation"
          class="docs-md__h3"
        >
          <a
            href="#when-validateson-is-included-in-the-field-invocation"
            class="heading-anchor"
          >
            When <code>validatesOn</code> is included in the field invocation
          </a>
        </h3>
        <p>
          We can see in the example below that the field invocation does have a <code>validatesOn</code> array, with a single item <code>countryCode Selected</code>.
        </p>
        <p>In this case, the field will validate on:</p>
        <ul class="docs-list-disc">
          <li>
            <code>submit</code> =: this is inherited from the top level addon default, due to <code>$inherited</code> being included in the <code>alwaysValidatesOn</code> array in the field definition.
          </li>
          <li>
            <code>focusOutPhoneNumberInput</code> =: the only other item in the <code>alwaysValidatesOn</code> array in the field definition.
          </li>
          <li>
            <code>countryCodeSelected</code> =: the only item in the <code>validatesOn</code> array in the field invocation.
          </li>
        </ul>

        <CustomFieldUsageTwoDemo />
      </div>
    </>
  );
}
