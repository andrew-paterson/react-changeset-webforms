import LoginFormDemo from '../components/demos/LoginFormDemo.jsx';
import { Link } from 'react-router-dom';

# Basic usage

Define your form, including its fields, and their validation rules in an object like the one below, and pass this to the `ChangesetWebform` component as the `formSchema` property, and that's it! The form will be rendered and all validation behaviours will work without any further template code.

<LoginFormDemo />

## Actions

You can pass actions to a instance of a `ChangesetWebform` component, to define behaviours which are individual to a particular instance of a form. The most obvious example would be the action that should run when the form is submitted, in many cases to submit the data from the form to the server.

The above example also includes a `submitSuccess` and `submitError` which will run when the `submit` action is resolved.

See <Link to="/docs/action-handling">Action handling</Link> for more details.

## Form settings

Every `formSchema` has formSettings object which defines options for the form as a whole.

Note that `formName` is required and no two forms rendered on the same page should have the same name.

In the example above, the following default options are overriden:

- `submitButtonText`
- `hideLabels`
- `clearFormAfterSubmit`

See <Link to="/docs/form-settings">Form settings</Link> for more details.
