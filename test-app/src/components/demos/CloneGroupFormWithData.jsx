// BEGIN-SNIPPET clone-group-form-with-data.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import { formSchema } from './CloneGroupForm.jsx';

const data = {
  emails: ['tobias@timosol.com', 'tobias@timosol.com', null, 'lindsay@timosol.com', 'maeby@timosol.com', 'funke@timosil.com'],
};

export default function CloneGroupFormWithData() {
  return (
    <ChangesetWebform
      formSchema={formSchema}
      data={data}
    />
  );
}
// END-SNIPPET
