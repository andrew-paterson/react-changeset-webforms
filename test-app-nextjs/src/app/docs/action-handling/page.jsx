import Link from 'next/link';

export default function ActionHandling() {
  return (
    <>
      <div className="docs-md">
        <h1 id="action-handling" class="docs-md__h1">
          Action handling
        </h1>
        <p>
          Ember Changeset Webforms aims to be as flexible and customisable as
          possible. For this reason, it allows you to pass action callbacks to
          several properties of the <code>ChangesetWebform</code> component, so
          that you can cusatomise the behaviour of your web form.
        </p>
        <h2 id="aftergeneratechangesetwebform-action" class="docs-md__h2">
          <a
            href="#aftergeneratechangesetwebform-action"
            class="heading-anchor"
          >
            <code>afterGenerateChangesetWebform</code> action
          </a>
        </h2>
        <p>
          Called when the <code>changesetWebform</code> class instance is
          created, which occues as soon as the component is intersted into the
          DOM.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <p>
          An example of where this can be useful is setting{' '}
          <code>changesetWebform</code> as a property on the parent component,
          thus allowing you top do things like set the value of a field,
          validate fields, or submit the form, in response to an event that
          happens outside of the <code>ChangesetWebform</code> component.
        </p>
        <h2 id="afterfieldinserted-action" class="docs-md__h2">
          <a href="#afterfieldinserted-action" class="heading-anchor">
            <code>afterFieldInserted</code> action
          </a>
        </h2>
        <p>Called after an invividual form field is inserted into the DOM.</p>
        <p>
          Arguments: (<code>formField</code>, <code>changesetWebform</code>)
        </p>
        <p>
          A field is inserted when the <code>CWFC</code> is loaded for the first
          time, and also where an individual field is included, either
          explicitly or dynamically, after having been omitted. See{' '}
          <Link href="/docs/hiding-and-showing-fields">
            Hiding and showing fields
          </Link>{' '}
          for more details.
        </p>
        <h2 id="onfieldvaluechange-action" class="docs-md__h2">
          <a href="#onfieldvaluechange-action" class="heading-anchor">
            <code>onFieldValueChange</code> action
          </a>
        </h2>
        <p>
          Called whenever the value of a field is updated, via the{' '}
          <code>updateValue</code> method.
        </p>
        <p>
          Arguments: (<code>formField</code>, <code>changesetWebform</code>)
        </p>
        <h2 id="afterfieldremoved-action" class="docs-md__h2">
          <a href="#afterfieldremoved-action" class="heading-anchor">
            <code>afterFieldRemoved</code> action
          </a>
        </h2>
        <p>Called after an invividual form field is removed from the DOM.</p>
        <p>
          Arguments: (<code>formField</code>, <code>changesetWebform</code>)
        </p>
        <p>
          A field will be removed from the DOM when it is omitted fropm the
          form, either explicitly or dynamically. See{' '}
          <Link href="/docs/hiding-and-showing-fields">
            Hiding and showing fields
          </Link>
        </p>
        <h2 id="afterfieldvalidation-action" class="docs-md__h2">
          <a href="#afterfieldvalidation-action" class="heading-anchor">
            <code>afterFieldValidation</code> action
          </a>
        </h2>
        <p>called after an individual field is validated.</p>
        <p>
          Arguments: (<code>formField</code>, <code>changesetWebform</code>,{' '}
          <code>validationResult</code>)
        </p>
        <h2 id="onuserinteraction-action" class="docs-md__h2">
          <a href="#onuserinteraction-action" class="heading-anchor">
            <code>onUserInteraction</code> action
          </a>
        </h2>
        <p>Called when a user interacts with a form field in any way.</p>
        <p>
          Arguments: (<code>formField</code>, <code>changesetWebform</code>,{' '}
          <code>eventName</code>, <code>fieldValue</code>,{' '}
          <code>browserEvent</code>)
        </p>
        <p>
          The <code>eventName</code> argument is simply a string that is used to
          namespace the type of user interaction, and is not based on actual
          browser event types.
        </p>
        <p>
          The <code>browserEvent</code> argument is the actual browser event
          object, and is only included where it exists.
        </p>
        <h2 id="beforeresetform-action" class="docs-md__h2">
          <a href="#beforeresetform-action" class="heading-anchor">
            <code>beforeResetForm</code> action
          </a>
        </h2>
        <p>
          Called after the user clicks the "Reset form" button, but before the
          form is reset.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <h2 id="afterresetform-action" class="docs-md__h2">
          <a href="#afterresetform-action" class="heading-anchor">
            <code>afterResetForm</code> action
          </a>
        </h2>
        <p>
          Called after the form is reset in response to the user clicking the
          "Reset form" button.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <h2 id="beforeclearform-action" class="docs-md__h2">
          <a href="#beforeclearform-action" class="heading-anchor">
            <code>beforeClearForm</code> action
          </a>
        </h2>
        <p>
          Called after the user clicks the "Clear form" button, but before the
          form is cleared.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <h2 id="afterclearform-action" class="docs-md__h2">
          <a href="#afterclearform-action" class="heading-anchor">
            <code>afterClearForm</code> action
          </a>
        </h2>
        <p>
          Called after the form is cleared in response to the user clicking the
          "Clear form" button.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <h2 id="submitdata-action" class="docs-md__h2">
          <a href="#submitdata-action" class="heading-anchor">
            <code>submitData</code> action
          </a>
        </h2>
        <p>
          Called after the form has been preflighted, in response to the user
          clicking "Submit". See{' '}
          <Link href="/docs/form-submission">Form submission</Link> for details on
          what preflighting does.
        </p>
        <p>
          Arguments: (<code>data</code>, <code>changesetWebform</code>)
        </p>
        <p>
          The <code>submitData</code> callback is where you use the data that
          comes out of the <code>CWFC</code> when the form is submitted. This is
          where you can submit the data to the server, if that is required.
        </p>
        <p>
          It should also return the result of that call so that the form knows
          when the call resolves. This allows it to:
        </p>
        <ul class="docs-list-disc">
          <li>
            set <code>formSettings.requestInFlight</code> to false, allowing
            request in flight UX to update.
          </li>
          <li>
            call the appropriate <code>submitSuccess</code> or{' '}
            <code>submitError</code> callback, if they have been passed to the
            component.
          </li>
        </ul>
        <h3 id="where-submitdata-is-not-required" class="docs-md__h3">
          <a href="#where-submitdata-is-not-required" class="heading-anchor">
            Where <code>submitData</code> is not required
          </a>
        </h3>
        <p>
          In some cases, the <code>@data</code> prop passed to the{' '}
          <code>CWFC</code> may have it's own <code>save()</code> method which
          will initiate a server call with the form data.
        </p>
        <p>
          An example is where <code>@data</code> is an Ember Data model. The
          internal behaviour of the <code>CWFC</code> is to call{' '}
          <code>changeset.save()</code> which{' '}
          <a
            href="https://github.com/adopted-ember-addons/ember-changeset?tab=readme-ov-file#save"
            class="docs-md__a"
          >
            will proxy to the underlying object's save method
          </a>
          , if it exists.
        </p>
        <p>
          When the <code>save()</code> method is called on the Ember Data model,
          a <code>PATCH</code> request will automatically be made to the
          relevant endpoint, and <code>submitData</code> is not necessary.
        </p>
        <h2 id="aftervalidatefields-action" class="docs-md__h2">
          <a href="#aftervalidatefields-action" class="heading-anchor">
            <code>afterValidateFields</code> action
          </a>
        </h2>
        <p>
          All fields are automatically validated during preflighting when the
          form is submitted. The <code>afterValidateFields</code> callback is
          called after this occues, but before the changeset data is updated in
          preflighting. An example of how the data is updated, is that any
          changeset property is set to null if the corresponding form field is
          omitted. See{' '}
          <Link href="/docs/hiding-and-showing-fields">
            Hiding and showing fields
          </Link>{' '}
          for more details.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <h2 id="beforesubmitform-action" class="docs-md__h2">
          <a href="#beforesubmitform-action" class="heading-anchor">
            <code>beforeSubmitForm</code> action
          </a>
        </h2>
        <p>
          Called after a form has been preflighted and passed validation, in
          response to the <code>submit()</code> method being called on the{' '}
          <code>changesetWebform</code> class instance, usually when the user
          clicks the submit button.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>)
        </p>
        <p>Called before:</p>
        <ul class="docs-list-disc">
          <li>
            <code>changesetWebform.formSettings.requestInFlight</code> is set to{' '}
            <code>true</code>
          </li>
          <li>
            the <code>save()</code> method is called on the underlying changeset
          </li>
          <li>
            the <code>submitData</code> callback is called, if it has been
            passed.
          </li>
        </ul>
        <h2 id="submitsuccess-action" class="docs-md__h2">
          <a href="#submitsuccess-action" class="heading-anchor">
            <code>submitSuccess</code> action
          </a>
        </h2>
        <p>Called after the form has been successfully submitted.</p>
        <p>
          Arguments: (<code>successServerResponse</code>,{' '}
          <code>changesetWebform</code>)
        </p>
        <p>The form has been successfully submitted where:</p>
        <ul class="docs-list-disc">
          <li>
            A success response is returned from the <code>submitData</code>{' '}
            callback.
          </li>
          <li>
            A success response is returned from the underlying objects{' '}
            <code>save()</code> method, where <code>submitData</code> is not
            passed.
          </li>
        </ul>
        <h2 id="submiterror-action" class="docs-md__h2">
          <a href="#submiterror-action" class="heading-anchor">
            <code>submitError</code> action
          </a>
        </h2>
        <p>Called after an attempt to submit the form has failed.</p>
        <p>
          Arguments: (<code>errorServerResponse</code>,{' '}
          <code>changesetWebform</code>)
        </p>
        <p>An attempt to submit the form has failed where:</p>
        <ul class="docs-list-disc">
          <li>
            An error response is returned from the <code>submitData</code>{' '}
            callback.
          </li>
          <li>
            An error response is returned from the underlying objects{' '}
            <code>save()</code> method, where <code>submitData</code> is not
            passed.
          </li>
        </ul>
        <h2 id="onformsubmit-action" class="docs-md__h2">
          <a href="#onformsubmit-action" class="heading-anchor">
            <code>onFormSubmit</code> action
          </a>
        </h2>
        <p>
          Called when the <code>submit</code> method on the{' '}
          <code>changesetWebform</code> class instance is called. This is
          usually when user clicks the submit button, but could also be
          initiated from outside of the form.
        </p>
        <p>
          Arguments: (<code>changesetWebform</code>, <code>componentArgs</code>)
        </p>
        <p>
          If this callback is passed, it will completely replace the default
          submit behaviour of the <code>CWFC</code>. See{' '}
          <Link href="/docs/form-submission">Custom form submission</Link> for a
          more detailed example.
        </p>
        <p>
          Note that <code>afterValidateFields</code>,{' '}
          <code>beforeSubmitForm</code>, <code>submitForm</code>,{' '}
          <code>submitSuccess</code> and <code>submitError</code> will no longer
          be automatically called if <code>onFormSubmit</code> is passed. Your{' '}
          <code>onFormSubmit</code> function would need to call these callbacks
          if you still want to use them.
        </p>
      </div>
    </>
  );
}
