import DefaultFormSubmissionDemo from '../../../components/demos/DefaultFormSubmissionDemo.jsx';
import CustomFormSubmissionDemo from '../../../components/demos/CustomFormSubmissionDemo.jsx';
import Link from 'next/link';

export default function FormSubmission() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="form-submission"
          class="docs-md__h1"
        >
          Form submission
        </h1>
        <h2
          id="default-form-submission"
          class="docs-md__h2"
        >
          <a
            href="#default-form-submission"
            class="heading-anchor"
          >
            Default form submission
          </a>
        </h2>
        <p>
          When a user clicks the submit button, the <code>submit</code> action is fired the <code>ChangesetWebform</code> component.
        </p>
        <p>The following series of events occurs.</p>
        <h3
          id="preflighting"
          class="docs-md__h3"
        >
          <a
            href="#preflighting"
            class="heading-anchor"
          >
            Preflighting
          </a>
        </h3>
        <p>A preflight function is run which:</p>
        <ul class="docs-list-disc">
          <li>Validates all fields.</li>
          <li>
            Calls the <code>afterValidateFields</code> action.
            <ul class="docs-list-disc">
              <li>
                If validation fails it calls the <code>formValidationFailed</code> action.
              </li>
              <li>
                If validation passes it:
                <ul class="docs-list-disc">
                  <li>
                    Calls the <code>formValidationPassed</code> action.
                  </li>
                  <li>
                    Calls the <code>beforeSubmitForm</code> action.
                  </li>
                  <li>
                    For any fields that are omitted, the corresponding changeset proprties are set to null. See <Link href="/docs/hiding-and-showing-fields">Hiding and showing fields</Link> for more.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <h3
          id="activation-of-the-tracked-requestinflight-property"
          class="docs-md__h3"
        >
          <a
            href="#activation-of-the-tracked-requestinflight-property"
            class="heading-anchor"
          >
            Activation of the tracked requestInFlight property
          </a>
        </h3>
        <p>
          The tracked property <code>changesetWebform.formSettings.requestInFlight</code> is set to <code>true</code>. This can be used to create a UX which shows the user that a response is pending.
        </p>
        <h3
          id="the-changeset-is-saved"
          class="docs-md__h3"
        >
          <a
            href="#the-changeset-is-saved"
            class="heading-anchor"
          >
            The changeset is saved
          </a>
        </h3>
        <p>
          The changeset is saved using the <code>changeset.save()</code> method. This means that if your changeset is an Ember model, the models <code>save</code> method will be triggered, which will update the record in Ember Data, but also send a <code>PATCH</code> request to the server to persist those changes.
        </p>
        <h3
          id="call-the-submitdata-action-if-passed"
          class="docs-md__h3"
        >
          <a
            href="#call-the-submitdata-action-if-passed"
            class="heading-anchor"
          >
            Call the <code>submitData</code> action if passed
          </a>
        </h3>
        <p>
          If <code>@submitData</code> is passed to the
          <code>ChangesetWebform</code>
          component it will be called at this point.
        </p>
        <p>Unless your changeset is an Ember model, you will need to use this action to trigger a network request, if that is required.</p>
        <p>
          An example would be to make a <code>POST</code> request to the sever, to persist a new record to the database.
        </p>
        <h3
          id="deactivation-of-the-tracked-requestinflight-property"
          class="docs-md__h3"
        >
          <a
            href="#deactivation-of-the-tracked-requestinflight-property"
            class="heading-anchor"
          >
            Deactivation of the tracked requestInFlight property
          </a>
        </h3>
        <p>
          The tracked property <code>changesetWebform.formSettings.requestInFlight</code> is set to <code>false</code>. This can be used to create a UX which shows the user that a response is complete.
        </p>
        <h3
          id="the-submitsuccess-or-submiterror-actions-are-called-if-passed"
          class="docs-md__h3"
        >
          <a
            href="#the-submitsuccess-or-submiterror-actions-are-called-if-passed"
            class="heading-anchor"
          >
            The <code>submitSuccess</code> or <code>submitError</code> actions are called if passed
          </a>
        </h3>
        <p>
          If <code>@submitSuccess</code> is passed to the <code>ChangesetWebform</code> component it will be called if the <code>changeset.save()</code> and <code>submitData</code> actions are successful. The response is included as the first argument. If <code>@submitError</code> is passed to the <code>ChangesetWebform</code> component it will be called if either the <code>changeset.save()</code> or <code>submitData</code> actions are unsuccessful. The error response is included as the first argument.
        </p>

        <DefaultFormSubmissionDemo />
        <h2
          id="custom-form-submission"
          class="docs-md__h2"
        >
          <a
            href="#custom-form-submission"
            class="heading-anchor"
          >
            Custom form submission
          </a>
        </h2>
        <p>
          If the <code>@onFormSubmit</code> action is passed to the <code>ChangesetWebform</code> component, it will completely override all default form submission behaviour.
        </p>
        <p>
          The action receives the <code>changesetWebform</code> object as its only argument.
        </p>
        <p>
          The example below also shows how the preflight util can be invoked if needed (See <code>Preflighting</code> above).
        </p>

        <CustomFormSubmissionDemo />
      </div>
    </>
  );
}
