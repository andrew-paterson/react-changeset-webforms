import SignupFormDemo from '../components/demos/SignupFormDemo.jsx';
import ClearAfterSubmitFormSchemaDemo from '../components/demos/ClearAfterSubmitFormSchemaDemo.jsx';
import { DocsSnippet } from '../components/docs-utils';

export default function FormSettings() {
  return (
    <>
      <div className="docs-md">
        <h1
          id="form-settings"
          class="docs-md__h1"
        >
          Form settings
        </h1>
        <p>Form settings control various aspects of the content and behaviour at the form level. The available settings are listed below.</p>

        <DocsSnippet
          name="form-settings-options.js"
          title="Default form settings and their values"
        />
        <p>
          Form level settings can be tweaked for each instance of a <code>changesetWebform</code> component, in the <code>formSettings</code> object at the root of your formSchema.
        </p>
        <p>
          The only required setting is <code>formName</code> which must be unique from that of any other form rendered on th page. This is to avoid the browser error from attempting to add multiple elements to the DOM with the same ID.
        </p>

        <SignupFormDemo />

        <ClearAfterSubmitFormSchemaDemo />
      </div>
    </>
  );
}
