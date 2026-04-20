'use client';

// BEGIN-SNIPPET clicker-example-1.jsx
import ChangesetWebform from 'react-changeset-webforms/src/components/ChangesetWebform.jsx';
import { useReducer } from 'react';

const formSchema = {
  formSettings: {
    formName: 'clickerExample1',
    hideSubmitButton: true,
  },
  fields: [
    {
      fieldLabel: 'Toggle advanced options',
      hideLabel: true,
      fieldId: 'toggleAdvanced',
      fieldType: 'clicker',
      attrsFromConfig: {
        classNames: {
          clickerElement: ['$inherited', 'btn', 'btn-primary'],
        },
      },
      clickerText: 'Advanced options',
      showAdvanced: false,
    },
    {
      fieldId: 'advanced',
      fieldType: 'input',
      fieldLabel: 'Advanced setting',
      omitted: true,
      advancedSetting: true,
    },
  ],
};

export default function ClickerExampleOneFormSchema() {
  const [, forceUpdate] = useReducer((n) => n + 1, 0);

  function onUserInteraction(formField, changesetWebform, eventName) {
    if (formField.fieldId === 'toggleAdvanced' && eventName === 'click') {
      formField.showAdvanced = !formField.showAdvanced;
      const advancedFields = changesetWebform.fields.filter((field) => field.advancedSetting);
      advancedFields.forEach((field) => field.setOmission(!field.omitted));
      forceUpdate();
    }
  }

  return (
    <div data-test-id="clicker-example-1">
      <ChangesetWebform
        formSchema={formSchema}
        onUserInteraction={onUserInteraction}
      />
    </div>
  );
}
// END-SNIPPET
