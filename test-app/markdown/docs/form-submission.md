import DefaultFormSubmissionDemo from '../../../../components/demos/DefaultFormSubmissionDemo.jsx'; import CustomFormSubmissionDemo from '../../../../components/demos/CustomFormSubmissionDemo.jsx'; import Link from 'next/link'; export default function FormSubmission() {
#  Form submission
When a user clicks the submit button, the`submit` action is fired the`ChangesetWebform` component.
The following series of events occurs.
A preflight function is run which:

- Validates all fields.
-  Calls the`afterValidateFields` action. If validation fails it calls the`formValidationFailed` action.
-  If validation passes it: Calls the`formValidationPassed` action.
-  Calls the`beforeSubmitForm` action.
-  For any fields that are omitted, the corresponding changeset proprties are set to null. SeeHiding and showing fields for more.
The tracked property`changesetWebform.formSettings.requestInFlight` is set to`true`. This can be used to create a UX which shows the user that a response is pending.
The changeset is saved using the`changeset.save()` method. This means that if your changeset is an Ember model, the models`save` method will be triggered, which will update the record in Ember Data, but also send a`PATCH` request to the server to persist those changes.
If`@submitData` is passed to the`ChangesetWebform` component it will be called at this point.
Unless your changeset is an Ember model, you will need to use this action to trigger a network request, if that is required.
An example would be to make a`POST` request to the sever, to persist a new record to the database.
The tracked property`changesetWebform.formSettings.requestInFlight` is set to`false`. This can be used to create a UX which shows the user that a response is complete.
If`@submitSuccess` is passed to the`ChangesetWebform` component it will be called if the`changeset.save()` and`submitData` actions are successful. The response is included as the first argument. If`@submitError` is passed to the`ChangesetWebform` component it will be called if either the`changeset.save()` or`submitData` actions are unsuccessful. The error response is included as the first argument.
If the`@onFormSubmit` action is passed to the`ChangesetWebform` component, it will completely override all default form submission behaviour.
The action receives the`changesetWebform` object as its only argument.
The example below also shows how the preflight util can be invoked if needed (See`Preflighting` above).