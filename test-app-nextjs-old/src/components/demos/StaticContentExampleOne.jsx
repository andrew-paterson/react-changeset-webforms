'use client';

// BEGIN-SNIPPET static-content-example-one.jsx
import ChangesetWebform from 'react-changeset-webforms';

const formSchema = {
  formSettings: {
    formName: 'staticContentExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldId: 'staticContent',
      fieldType: 'staticContent',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero similique, repellat fuga ad enim eveniet exercitationem earum et commodi necessitatibus doloremque saepe veniam consequuntur maxime a soluta ea perferendis sit.',
      textElement: 'p',
      textElementClass: 'bg-success text-white p-2 rounded',
    },
  ],
};

export default function StaticContentExampleOne() {
  return <ChangesetWebform formSchema={formSchema} />;
}
// END-SNIPPET
