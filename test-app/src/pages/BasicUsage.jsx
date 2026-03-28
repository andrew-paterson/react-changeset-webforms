import LoginFormDemo from '../components/demos/LoginFormDemo.jsx';
import { Link } from 'react-router-dom';

export default function BasicUsage() {
  return (
    <>
      <div className="docs-md">
        <h1 id="basic-usage" class="docs-md__h1">
          Basic usage
        </h1>
        <p>
          Define your form, including its fields validation rules in object like
          the one below, and pass this to the <code>ChangesetWebform</code>{' '}
          component as the <code>formSchema</code> property, and that's it! The
          form will be rendered and all validation behaviours will work without
          any further template code.
        </p>

        <LoginFormDemo />
        <h2 id="actions" class="docs-md__h2">
          <a href="#actions" class="heading-anchor">
            Actions
          </a>
        </h2>
        <p>
          You can pass actions to a instance of a <code>ChangesetWebform</code>{' '}
          component, to define behaviours whioch are individual to a particulary
          ionstance of a form. The most obvious example would be the action that
          should run whgern the form is submitted, in many cases to submit the
          data from the form to the server.
        </p>
        <p>
          The above example also includes a <code>submitSuccess</code> and{' '}
          <code>submitError</code> which will run when the <code>submit</code>{' '}
          action is resolved.
        </p>
        <p>
          See <Link to="/docs/action-handling">Action handling</Link> for more
          details.
        </p>
        <h2 id="form-settings" class="docs-md__h2">
          <a href="#form-settings" class="heading-anchor">
            Form settings
          </a>
        </h2>
        <p>
          Every <code>formSchema</code> has formSettings object which defines
          options for the form as a whole.
        </p>
        <p>
          Note that <code>formName</code> is required and no two forms rendered
          on the same page should have the same name.
        </p>
        <p>
          In the example above, the following default options are overriden:
        </p>
        <ul class="docs-list-disc">
          <li>
            <code>submitButtonText</code>
          </li>
          <li>
            <code>hideLabels</code>
          </li>
          <li>
            <code>clearFormAfterSubmit</code>
          </li>
        </ul>
        <p>
          See <Link to="/docs/form-settings">Form settings</Link> for more
          details.
        </p>
      </div>
    </>
  );
}
