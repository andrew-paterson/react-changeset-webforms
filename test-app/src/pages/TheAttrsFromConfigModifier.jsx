import FieldSettingsOverriddenDemo from '../components/demos/FieldSettingsOverriddenDemo.jsx';
import FormWideClassSettingsDemo from '../components/demos/FormWideClassSettingsDemo.jsx';
import FieldTypeWithinFormSettingsDemo from '../components/demos/FieldTypeWithinFormSettingsDemo.jsx';
import FieldSpecificClassSettingsDemo from '../components/demos/FieldSpecificClassSettingsDemo.jsx';
import InheritClassSettingsDemo from '../components/demos/InheritClassSettingsDemo.jsx';
import OverrideClassSettingsDemo from '../components/demos/OverrideClassSettingsDemo.jsx';
import ValidationClassSettingsDemo from '../components/demos/ValidationClassSettingsDemo.jsx';
import ShowClassesDemo from '../components/demos/ShowClassesDemo.jsx';
import AttrFunctionsDemo from '../components/demos/AttrFunctionsDemo.jsx';

export default function TheAttrsFromConfigModifier() {
  return (
    <>
      <div className="docs-md">
        <h1 id="the-attrs-from-config-modifer" class="docs-md__h1">The <code>attrs-from-config</code> modifer</h1>
<p>Many of the componets and elements in a ChangesetWebform component are invoked with the <code>{{attrs-from-config}}</code> modifier. In each case, the modifier is invoked with one more name spaces.</p>
<p>The example below shows how the modifier is invoked on the input element of an input field. It has two namespaces, <code>inputElement</code> and <code>inputField</code>.</p>
<ul class="docs-list-disc"><li><code>inputElement</code> is applied to all input elements in all fields.</li>
<li><code>inputField</code> is only applied to the input element in the input field.</li>
</ul>
<pre class="docs-md__code"><code class="language-javascript"><input
  {{attrs-<span class="hljs-keyword">from</span>-config <span class="hljs-string">"inputElement,inputField"</span> @changesetWebform @formField}}
  ...
  >
</code></pre>
<p>Using these namespaces, we can configure the class names that should be added to the element, or use functions to manipulate the rendered element directly. This is done via the <code>attrsFromConfig</code> object, which can have two properties, <code>classNames</code> and <code>attrFunctions</code>.</p>
<p>Both <code>classNames</code> and <code>attrFunctions</code> are objects whose keys refer to the namespaces passed to the <code>attrs-from-config</code> modifier.</p>
<pre class="docs-md__code"><code class="language-javascript"><span class="hljs-attr">attrsFromConfig</span>: {
  <span class="hljs-attr">classNames</span>: {
    <span class="hljs-attr">inputElement</span>: [<span class="hljs-string">&#x27;input&#x27;</span>, <span class="hljs-string">&#x27;padding-s&#x27;</span>], <span class="hljs-comment">// Will replace the inherited value of classNames.inputElement</span>
    <span class="hljs-attr">inputField</span>: [<span class="hljs-string">&#x27;$inherited&#x27;</span>, <span class="hljs-string">&#x27;$validationClassNames&#x27;</span>, <span class="hljs-string">&#x27;$validationPseudoClasses&#x27;</span>, <span class="hljs-string">&#x27;input-field&#x27;</span>] <span class="hljs-comment">// Will merge with the inherited value of classNames.inputElement, because `$inherited` is included.</span>
  }
  <span class="hljs-attr">attrFunctions</span>: {
    <span class="hljs-title function_">inputElement</span>(<span class="hljs-params">element, changesetWebform, formField, _classNameSettings</span>) { <span class="hljs-comment">// Will always replace the inherted value of attrFunctions.inputElement</span>
      <span class="hljs-keyword">if</span> (formField.<span class="hljs-property">fieldType</span> === <span class="hljs-string">&#x27;email&#x27;</span>) {
        element.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;email-input&#x27;</span>);
      }
    }
  }
}
</code></pre>
<p>The example above</p>
<h2 id="addon-defaults" class="docs-md__h2"><a href="#addon-defaults" class="heading-anchor">Addon defaults</a></h2>
<p>The addon implements defaults which can be found in the <code>attrsFromConfig</code> object at <code>./utils/addon-defaults.js</code></p>
<p>In order to override these defaults, an <code>attrsFromConfig</code> object can included in the following places, listed in order of specificity.</p>
<p>At each level, the merged value of <code>attrsFromConfig</code> will be inherited, so you only need to include the parts that you would like to override.</p>
<h3 id="app-wide-scope" class="docs-md__h3"><a href="#app-wide-scope" class="heading-anchor">App wide scope</a></h3>
<ul class="docs-list-disc"><li><code>changesetWebformsDefaults.attrsFromConfig</code> in <code>services/ember-changeset-webforms.js</code> (Applied throuought the app wide config)</li>
<li>Any of the field types <code>changesetWebformsDefaults.fieldTypes</code> in <code>services/ember-changeset-webforms.js</code> (Applied throuought the app wide config)</li>
</ul>
<h3 id="single-instance-scope" class="docs-md__h3"><a href="#single-instance-scope" class="heading-anchor">Single instance scope</a></h3>
<p>Here, <code>@formSchema</code> refers to the object whioch is passed to <code>@formSchema</code> property of the <code>ChangesetWebform</code> component.</p>
<ul class="docs-list-disc"><li><code>@formSchema.attrsFromConfig</code> (Applied to a specific instance of a <code>ChangesetWebform</code> component)</li>
<li>Any of the field types defined in <code>@formSchema.fieldSettings.fieldTypes</code> (Applied to all fields with the specified <code>fieldType</code>, within specific instance of a <code>ChangesetWebform</code> component)</li>
<li><code>field.attrsFromConfig</code> where field is the definition of a specidfic field in <code>@formSchema.fields</code></li>
</ul>
<h2 id="configuring-element-class-names" class="docs-md__h2"><a href="#configuring-element-class-names" class="heading-anchor">Configuring element class names</a></h2>
<p>The addon provides fine grained control over the class names that are applied to the various elements which are rendered within the <code>ChangesetWebform</code> component.</p>
<p>This allows you to fit the markup of your forms to an existing CSS library without overriding any template files.</p>
<h3 id="default-class-names" class="docs-md__h3"><a href="#default-class-names" class="heading-anchor">Default class names</a></h3>
<p>The snippet below shows the full list of configurable class names, as well the their internal defaults.</p>
<p>The value of each class name property must be an array or a function.</p>
<p>Each property name is chosen to indicate which element it targets.</p>
<p>These properties can be modified at the app, form and field level, as outlined below.</p>

<DocsSnippet @name="configurable-classnames.js" @title="Internal class name defaults" />
<h3 id="app-level-configuration" class="docs-md__h3"><a href="#app-level-configuration" class="heading-anchor">App level configuration</a></h3>
<p>App wide class name settings can be set in the <code>ENV.changesetWebformsDefaults.classNames</code> object in <code>services/ember-changeset-webforms.js</code>.</p>
<p>For example, the snippet below would add the class <code>label-el</code> to all label elements rendered by the <code>ChangesetWebform</code> component.</p>

<DocsSnippet @title="services/ember-changeset-webforms.js" @name="app-wide-classes.js" />
<h3 id="app-level-configuration-field-type-specific" class="docs-md__h3"><a href="#app-level-configuration-field-type-specific" class="heading-anchor">App level configuration - field type specific</a></h3>
<p>App wide class name settings for a specific type of field can be set by adding an object for the relevant field type <code>ENV.changesetWebformsDefaults.fieldTypes</code> array in <code>services/ember-changeset-webforms.js</code>. This object can then have a <code>classNames</code> array where class names can be set.</p>
<p>For example, the snippet below would add the class <code>radio-button-group-label</code> to label elements rendered in all <code>radioButtonGroup</code> fields throughout the app.</p>
<p>The {{this.fieldTypes.length}} built in fields have the following <code>fieldTypes</code>:</p>

<ul>
{{#each this.fieldTypes as |fieldType|}}
  <code style="display: inline-block; margin: 0 20px 10px 0;">{{fieldType}}</code>
{{/each}}
</ul>
<p>The two snippets from <code>services/ember-changeset-webforms.js</code> above, result in the following class names on the two label elements in the form below.</p>

<FieldSettingsOverriddenDemo />
<h3 id="form-level-configuration" class="docs-md__h3"><a href="#form-level-configuration" class="heading-anchor">Form level configuration</a></h3>
<p>Class names can be customised within a single instance of a <code>ChangesetWebform</code> object.</p>
<p>This is achived via the <code>classNames</code> property of the form schema. These settings will then apply throughout the particular form.</p>
<p>This can technically also be achived using the <code>fieldSettings.classNames</code> property of the form schema, but this is not recommended.</p>

<FormWideClassSettingsDemo />
<h3 id="form-level-configuration-field-type-specific" class="docs-md__h3"><a href="#form-level-configuration-field-type-specific" class="heading-anchor">Form level configuration - field type specific</a></h3>
<p>Class names can be customised within all fields of a certain type, which occur within a single instance of a <code>ChangesetWebform</code> object.</p>
<p>This is achived via the in the <code>classNames</code> property of <code>fieldSettings.fieldTypes</code> in the form schema.</p>
<p>These settings will then apply in every instance of the relevant field type, throughout the particular form.</p>

<FieldTypeWithinFormSettingsDemo />
<h3 id="field-level-configuration" class="docs-md__h3"><a href="#field-level-configuration" class="heading-anchor">Field level configuration</a></h3>
<p>Class names can be customised for an individual form field using the <code>classNames</code> property of the relevant <code>field</code> object in <code>formSchema.fields</code>.</p>

<FieldSpecificClassSettingsDemo />
<h3 id="inheriting-vs-overriding-class-names-settings-from-higher-levels" class="docs-md__h3"><a href="#inheriting-vs-overriding-class-names-settings-from-higher-levels" class="heading-anchor">Inheriting vs overriding class names settings from higher levels</a></h3>
<p>Include <code>$inherited</code> in the array of class names for an element as a placeholder for the class names inherited from the next level up.</p>

<InheritClassSettingsDemo />
<p>Alternatively, exclude <code>$inherited</code> in order to completely override the value.</p>
<p>Note that the class <code>form-label</code> is still included. This is because it is included via the <code>fieldLabel</code> property, and it is the <code>labelElement</code> property which has been overridden.</p>

<OverrideClassSettingsDemo />
<h3 id="including-dynamic-validation-class-names" class="docs-md__h3"><a href="#including-dynamic-validation-class-names" class="heading-anchor">Including dynamic validation class names</a></h3>
<p>The class names applied to elements as a result of wither passing or failing validation are defined in the <code>validClassNames</code> and <code>invalidClassNames</code> properties respectively. The defaults are <code>is-valid</code> and <code>is-invalid</code>.</p>
<p>You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding <code>$validationClassNames</code> as an class name for any element which should receive those class names.</p>

<ValidationClassSettingsDemo />
<h3 id="enabling-the-valid-and-invalid-pseudo-classes-with-validationpseudoclasses" class="docs-md__h3"><a href="#enabling-the-valid-and-invalid-pseudo-classes-with-validationpseudoclasses" class="heading-anchor">Enabling the :valid and :invalid pseudo classes with <code>$validationPseudoClasses</code></a></h3>
<p>If <code>$validationPseudoClasses</code> is one of the items in the array of class names, <em>and</em> the element in question is a form element, then the <code>data-set-custom-validity</code> attribute will set to <code>true</code> on the element.</p>
<p>As a result, whenever the field is validated, all elements within that field with <code>data-set-custom-validity=true</code> will have their <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity" class="docs-md__a"><code>setCustomValidity</code></a> method called with any validation errors. This allows the browser to add the <code>:valid</code> or <code>:invalid</code> pseudo classes to the elements as appropriate.</p>

<ShowClassesDemo />
<h2 id="manipulting-dom-attrs-with-a-function" class="docs-md__h2"><a href="#manipulting-dom-attrs-with-a-function" class="heading-anchor">Manipulting DOM attrs with a function</a></h2>
<p>If you would one or more class names for an element to be dynamic, you can add a method to the <code>classNames</code> object to manipulate the final array of class names for a particular class name property.</p>
<p>The name of the method should be the the property name with <code>Fn</code> appended. For example the methos at <code>classNames.submitButtonFn</code> will be applied to the classes for the <code>submitButton</code> property. It must return an array of strings.</p>
<ul class="docs-list-disc"><li><code>element</code> => the DOM element</li>
<li><code>changesetWebform</code> => the changesetWebform instance.</li>
<li><code>formField</code> => the relevant form field object, where the relevant element is within a form field.</li>
<li><code>classNameSettings</code> => the merged class name settings as they apply to an instance of changesetWebform or a form field.</li>
</ul>
<p>The example below removes the class <code>btn-primary</code> adds the class <code>btn-success</code> to the submit button if <code>formSettings.requestInFlight</code> is true. This results in a green background.</p>
<p>Note that what you return from the method will completely override the class name settings for the property.</p>
<p>If you would like to keep those classes, then always include the contents of the first argument (<code>classNamesArray</code>) in the response.</p>
<p>The method will be run each time the <code>class-names-from-config</code> helper is instered or updated in the relevant template. As it receives <code>changesetWebform</code> and <code>formField</code> as arguments, this will occur whenever a getter or tracked property is updated on opne of those to class instances.</p>

<AttrFunctionsDemo />
<pre class="docs-md__code"><code>
</code></pre>
      </div>
    </>
  );
}
