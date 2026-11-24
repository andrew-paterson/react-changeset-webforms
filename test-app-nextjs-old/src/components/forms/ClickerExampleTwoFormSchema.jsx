'use client';

// BEGIN-SNIPPET custom-component-clicker.jsx
import ChangesetWebform from 'react-changeset-webforms';
import CustomClickerComponent from './CustomClickerComponent.jsx';
import { useReducer } from 'react';

const formSchema = {
  formSettings: {
    formName: 'clickerExample2',
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
          clickerElement: ['$inherited', 'btn'],
        },
      },
      clickerText: 'Advanced options',
      displayComponent: {
        componentClass: CustomClickerComponent,
        props: {
          buttonType: 'danger',
        },
      },
      customProps: { showAdvanced: false },
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

export default function ClickerExampleTwoFormSchema() {
  const [_, forceUpdate] = useReducer((n) => n + 1, 0);
  function onUserInteraction(formField, changesetWebform, eventName) {
    if (formField.fieldId === 'toggleAdvanced' && eventName === 'click') {
      formField.customProps.showAdvanced = !formField.customProps.showAdvanced;
      const advancedFields = changesetWebform.fields.filter(
        (field) => field.advancedSetting,
      );
      advancedFields.forEach((field) => field.setOmission(!field.omitted));
      forceUpdate();
    }
  }

  return (
    <div data-test-id="clicker-example-2">
      <ChangesetWebform
        formSchema={formSchema}
        onUserInteraction={onUserInteraction}
      />
    </div>
  );
}
// END-SNIPPET
