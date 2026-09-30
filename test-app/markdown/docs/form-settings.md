# Form settings

Form settings control various aspects of the content and behaviour at the form level. The available settings are listed below.

<DocsSnippet @name="form-settings-options.js" @title="Default form settings and their values" />

Form level settings can be tweaked for each instance of a `changesetWebform` component, in the `formSettings` object at the root of your formSchema.

The only required setting is `formName` which must be unique from that of any other form rendered on th page. This is to avoid the browser error from attempting to add multiple elements to the DOM with the same ID.

<Demos::SignupForm />

<Demos::ClearAfterSubmitFormSchema />
