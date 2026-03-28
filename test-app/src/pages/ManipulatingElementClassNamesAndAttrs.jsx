import AppWideFieldSettingsOverriddenDemo from '../components/demos/AppWideFieldSettingsOverriddenDemo.jsx';
import FieldSettingsOverriddenDemo from '../components/demos/FieldSettingsOverriddenDemo.jsx';
import FormWideClassSettingsDemo from '../components/demos/FormWideClassSettingsDemo.jsx';
import FieldTypeWithinFormSettingsDemo from '../components/demos/FieldTypeWithinFormSettingsDemo.jsx';
import FieldSpecificClassSettingsDemo from '../components/demos/FieldSpecificClassSettingsDemo.jsx';
import InheritClassSettingsDemo from '../components/demos/InheritClassSettingsDemo.jsx';
import OverrideClassSettingsDemo from '../components/demos/OverrideClassSettingsDemo.jsx';
import ValidationClassSettingsDemo from '../components/demos/ValidationClassSettingsDemo.jsx';
import ShowClassesDemo from '../components/demos/ShowClassesDemo.jsx';
import AttrFunctionsDemo from '../components/demos/AttrFunctionsDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';
import { Link } from 'react-router-dom';

export default function ManipulatingElementClassNamesAndAttrs() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="manipulating-element-class-names-and-attrs"
          class="docs-md__h1"
        >
          Manipulating element class names and attrs
        </h1>
        <h2
          id="the-attrs-from-config-hook"
          class="docs-md__h2"
        >
          <a
            href="#the-attrs-from-config-hook"
            class="heading-anchor"
          >
            The <code>attrs-from-config</code> hook
          </a>
        </h2>
        <p>TODO</p>
        <p>Note that:</p>
        <ul class="docs-list-disc">
          <li>
            the <code>inputElement</code> namespace is applied to both input element,
          </li>
          <li>
            the <code>inputField</code> namespace is only applied to the input element in the built in <Link to="/docs/input">Input field</Link>,
          </li>
          <li>
            the <code>powerDatePickerTimeSelectorInput</code> namespace is only applied to the input elements in the built in <Link to="/docs/power-datepicker">Power Datepicker field</Link>.
          </li>
        </ul>
        <p>
          This means that configuration using the <code>inputElement</code> namespace will affect both of the above inputs. Conversely, configuration using the <code>inputField</code> namespace will only apply to the input element in the Input field.
        </p>
        <p>
          Using these namespaces, we can configure the class names that should be added to the rendered element, or use functions to manipulate the rendered element directly. This is done via the <code>attrsFromConfig</code> object, which can have two properties, <code>classNames</code> and <code>attrFunctions</code>.
        </p>
        <p>
          Both <code>classNames</code> and <code>attrFunctions</code> are objects whose keys refer to the namespaces passed to the <code>attrs-from-config</code> modifier.
        </p>
        <pre class="docs-md__code">
          <code class="language-javascript">
            <span class="hljs-attr">attrsFromConfig</span>: &#123;
            <span class="hljs-attr">classNames</span>: &#123;
            <span class="hljs-attr">inputElement</span>: [<span class="hljs-string">&#x27;input&#x27;</span>, <span class="hljs-string">&#x27;padding-s&#x27;</span>], <span class="hljs-comment">// Will replace the inherited value of classNames.inputElement</span>
            <span class="hljs-attr">inputField</span>: [<span class="hljs-string">&#x27;$inherited&#x27;</span>, <span class="hljs-string">&#x27;$validationClassNames&#x27;</span>, <span class="hljs-string">&#x27;$validationPseudoClasses&#x27;</span>, <span class="hljs-string">&#x27;input-field&#x27;</span>] <span class="hljs-comment">// Will merge with the inherited value of classNames.inputElement, because `$inherited` is included.</span>
            &#125;
            <span class="hljs-attr">attrFunctions</span>: &#123;
            <span class="hljs-title function_">inputElement</span>(<span class="hljs-params">element, changesetWebform, formField, _classNameSettings</span>) &#123; <span class="hljs-comment">// Will always replace the inherted value of attrFunctions.inputElement</span>
            <span class="hljs-keyword">if</span> (formField.
            <span class="hljs-property">fieldType</span> === <span class="hljs-string">&#x27;email&#x27;</span>) &#123; element.
            <span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;email-input&#x27;</span>); &#125; &#125; &#125; &#125;
          </code>
        </pre>
        <h3
          id="debug-mode"
          class="docs-md__h3"
        >
          <a
            href="#debug-mode"
            class="heading-anchor"
          >
            Debug mode
          </a>
        </h3>
        <p>
          Switichig on debuig mode in general config, or for a specific instance of a <code>ChangesetWebform</code> component, will show the namespaces applied to the various elements in the DOM as class names. This allows you to easily determine which namespace should be used to manipulate the class names or other attrinutes of an element.
        </p>
        <p>
          See <Link to="/docs/debug-mode">the debug mode docs</Link> for more.
        </p>
        <h2
          id="default-config"
          class="docs-md__h2"
        >
          <a
            href="#default-config"
            class="heading-anchor"
          >
            Default config
          </a>
        </h2>
        <p>
          The addon implements defaults which can be found in the <code>attrsFromConfig</code> object at <code>./utils/addon-defaults.js</code>, shown in the snippet below.
        </p>
        <DocsSnippet
          name="default-attrs-from-config.js"
          title="Default attrsFromConfig object"
        />
        <h2
          id="overriding-default-config"
          class="docs-md__h2"
        >
          <a
            href="#overriding-default-config"
            class="heading-anchor"
          >
            Overriding default config
          </a>
        </h2>
        <p>
          In order to override these defaults, an <code>attrsFromConfig</code> object can included in the following places, listed in order of specificity.
        </p>
        <ol class="docs-list-decimal">
          <li>
            <strong>
              <a
                href="#1-app-level-configuration"
                class="docs-md__a"
              >
                App level configuration
              </a>
            </strong>{' '}
            - <code>changesetWebformsDefaults.attrsFromConfig</code> in <code>services/ember-changeset-webforms.js</code> (Applied throuought the app wide config)
          </li>
          <li>
            <strong>
              <a
                href="#2-app-level-configuration-field-type-specific"
                class="docs-md__a"
              >
                App level configuration - field type specific
              </a>
            </strong>{' '}
            - Any of the field types <code>changesetWebformsDefaults.fieldTypes</code> in <code>services/ember-changeset-webforms.js</code> (Applied throuought the app wide config)
          </li>
          <li>
            <strong>
              <a
                href="#3-form-level-configuration"
                class="docs-md__a"
              >
                Form level configuration
              </a>
            </strong>{' '}
            - <code>@formSchema.attrsFromConfig</code> (Applied to a specific instance of a <code>ChangesetWebform</code> component)
          </li>
          <li>
            <strong>
              <a
                href="#4-form-level-configuration-field-type-specific"
                class="docs-md__a"
              >
                Form level configuration - field type specific
              </a>
            </strong>{' '}
            - Any of the field types defined in <code>@formSchema.fieldSettings.fieldTypes</code> (Applied to all fields with the specified <code>fieldType</code>, within specific instance of a <code>ChangesetWebform</code> component)
          </li>
          <li>
            <strong>
              <a
                href="#5-field-level-configuration"
                class="docs-md__a"
              >
                Field level configuration
              </a>
            </strong>{' '}
            - <code>field.attrsFromConfig</code> where field is the definition of a specidfic field in <code>@formSchema.fields</code>.
          </li>
        </ol>
        <p>
          At each level, the merged value of <code>attrsFromConfig</code> will be inherited, so you only need to include config for the namespaces that you would like to override.
        </p>
        <h2
          id="examples"
          class="docs-md__h2"
        >
          <a
            href="#examples"
            class="heading-anchor"
          >
            Examples
          </a>
        </h2>
        <h3
          id="1-app-level-configuration"
          class="docs-md__h3"
        >
          <a
            href="#1-app-level-configuration"
            class="heading-anchor"
          >
            1. App level configuration
          </a>
        </h3>
        <p>
          The example below shows how to the <code>ember-changeset-webforms</code> service can be used to add the class name <code>app-wide-label-element-class</code> to all label elements throughout the app.
        </p>
        <AppWideFieldSettingsOverriddenDemo />
        <h3
          id="2-app-level-configuration-field-type-specific"
          class="docs-md__h3"
        >
          <a
            href="#2-app-level-configuration-field-type-specific"
            class="heading-anchor"
          >
            2. App level configuration - field type specific
          </a>
        </h3>
        <p>
          The example below shows how the <code>ember-changeset-webforms</code> service can be used to add the class name <code>app-wide-radio-button-group-label-element-class</code> to all label elements within fields with type <code>radioButtonGroup</code> throughout the app.
        </p>
        <p>Thus, the class name is added to all radio option labels throughout the app.</p>
        <FieldSettingsOverriddenDemo />
        <p>
          The built in fields have the following <code>fieldTypes</code>:
        </p>
        <ul>
          <li>
            <code></code>
          </li>
        </ul>
        <h3
          id="3-form-level-configuration"
          class="docs-md__h3"
        >
          <a
            href="#3-form-level-configuration"
            class="heading-anchor"
          >
            3. Form level configuration
          </a>
        </h3>
        <p>
          The example below show how the <code>attrsFromConfig</code> property of a formSchema can be used to add the class name <code>form-wide-label-class</code> to all labels throughout one instance of a <code>ChangesetWebform</code> component.
        </p>
        <FormWideClassSettingsDemo />
        <h3
          id="4-form-level-configuration-field-type-specific"
          class="docs-md__h3"
        >
          <a
            href="#4-form-level-configuration-field-type-specific"
            class="heading-anchor"
          >
            4. Form level configuration - field type specific
          </a>
        </h3>
        <p>
          The example below show how the <code>attrsFromConfig</code> property of a specific field type in <code>formSchema.formSettings.fieldTypes</code> can be used to add the class name <code>form-wide-radio-button-label-el-class</code> to all label elements within fields with type <code>radioButtonGroup</code> throughout one instance of a <code>ChangesetWebform</code> component.
        </p>
        <FieldTypeWithinFormSettingsDemo />
        <h3
          id="5-field-level-configuration"
          class="docs-md__h3"
        >
          <a
            href="#5-field-level-configuration"
            class="heading-anchor"
          >
            5. Field level configuration
          </a>
        </h3>
        <p>The example below shows:</p>
        <ul class="docs-list-disc">
          <li>
            how the <code>attrsFromConfig</code> property of the <code>name</code> field can be used to add the class name <code>class-for-the-field-label-of-this-field</code> to the field label for that field,
          </li>
          <li>
            how the <code>attrsFromConfig</code> property of the <code>radioButtons1</code> field can be used to add the class name <code>class-for-all-label-els-in-this-field</code> to the field label for that field.
          </li>
        </ul>
        <FieldSpecificClassSettingsDemo />
        <h2
          id="special-classnames-values"
          class="docs-md__h2"
        >
          <a
            href="#special-classnames-values"
            class="heading-anchor"
          >
            Special <code>classNames</code> values
          </a>
        </h2>
        <p>
          The class names <code>$inherited</code>, <code>$validationClassNames</code> and <code>$validationPseudoClasses</code> have special meanings, outlined below. They will never be included in a final listed of class names on a browser element.
        </p>
        <h3
          id="inheriting-vs-overriding-class-names-settings-from-higher-levels"
          class="docs-md__h3"
        >
          <a
            href="#inheriting-vs-overriding-class-names-settings-from-higher-levels"
            class="heading-anchor"
          >
            Inheriting vs overriding class names settings from higher levels
          </a>
        </h3>
        <p>
          Include <code>$inherited</code> in the array of class names for an element as a placeholder for the class names inherited from the next level up.
        </p>
        <InheritClassSettingsDemo />
        <p>
          Alternatively, exclude <code>$inherited</code> in order to completely override the value.
        </p>
        <p>
          Note that the class <code>form-label</code> is still included. This is because it is included via the <code>fieldLabel</code> property, and it is the <code>labelElement</code> property which has been overridden.
        </p>
        <OverrideClassSettingsDemo />
        <h3
          id="including-dynamic-validation-class-names"
          class="docs-md__h3"
        >
          <a
            href="#including-dynamic-validation-class-names"
            class="heading-anchor"
          >
            Including dynamic validation class names
          </a>
        </h3>
        <p>
          The class names applied to elements as a result of wither passing or failing validation are defined in the <code>validClassNames</code> and <code>invalidClassNames</code> properties respectively. The defaults are <code>is-valid</code> and <code>is-invalid</code>.
        </p>
        <p>
          You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding <code>$validationClassNames</code> as an class name for any element which should receive those class names.
        </p>
        <ValidationClassSettingsDemo />
        <h3
          id="enabling-the-valid-and-invalid-pseudo-classes-with-validationpseudoclasses"
          class="docs-md__h3"
        >
          <a
            href="#enabling-the-valid-and-invalid-pseudo-classes-with-validationpseudoclasses"
            class="heading-anchor"
          >
            Enabling the :valid and :invalid pseudo classes with <code>$validationPseudoClasses</code>
          </a>
        </h3>
        <p>
          If <code>$validationPseudoClasses</code> is one of the items in the array of class names, <em>and</em> the element in question is a form element, then the <code>data-set-custom-validity</code> attribute will set to <code>true</code> on the element.
        </p>
        <p>
          As a result, whenever the field is validated, all elements within that field with <code>data-set-custom-validity=true</code> will have their{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity"
            class="docs-md__a"
          >
            <code>setCustomValidity</code>
          </a>{' '}
          method called with any validation errors. This allows the browser to add the <code>:valid</code> or <code>:invalid</code> pseudo classes to the elements as appropriate.
        </p>
        TODO add code that shows class names in the DOM.
        <h2
          id="manipulting-dom-attrs-with-a-function"
          class="docs-md__h2"
        >
          <a
            href="#manipulting-dom-attrs-with-a-function"
            class="heading-anchor"
          >
            Manipulting DOM attrs with a function
          </a>
        </h2>
        <p>
          If you would one or more class names for an element to be dynamic, you can add a method to the <code>classNames</code> object to manipulate the final array of class names for a particular class name property.
        </p>
        <p>
          The name of the method should be the the property name with <code>Fn</code> appended. For example the methos at <code>classNames.submitButtonFn</code> will be applied to the classes for the <code>submitButton</code> property. It must return an array of strings.
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>element</code> =: the DOM element
          </li>
          <li>
            <code>changesetWebform</code> =: the changesetWebform instance.
          </li>
          <li>
            <code>formField</code> =: the relevant form field object, where the relevant element is within a form field.
          </li>
          <li>
            <code>classNameSettings</code> =: the merged class name settings as they apply to an instance of changesetWebform or a form field.
          </li>
        </ul>
        <p>
          The example below removes the class <code>btn-primary</code> adds the class <code>btn-success</code> to the submit button if <code>formSettings.requestInFlight</code> is true. This results in a green background.
        </p>
        <p>Note that what you return from the method will completely override the class name settings for the property.</p>
        <p>
          If you would like to keep those classes, then always include the contents of the first argument (<code>classNamesArray</code>) in the response.
        </p>
        <p>
          The method will be run each time the <code>class-names-from-config</code> helper is instered or updated in the relevant template. As it receives <code>changesetWebform</code> and <code>formField</code> as arguments, this will occur whenever a getter or tracked property is updated on opne of those to class instances.
        </p>
        <AttrFunctionsDemo />
      </div>
    </>
  );
}
