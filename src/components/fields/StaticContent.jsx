export default function StaticContent({ formField, changesetWebform }) {
  if (formField.contentComponent) {
    const ContentComponent = formField.contentComponent.componentClass;
    return (
      <ContentComponent
        props={formField.contentComponent.props}
        formField={formField}
        changesetWebform={changesetWebform}
      />
    );
  }

  const Tag = formField.textElement || 'p';
  return (
    <Tag
      className={formField.textElementClass}
      dangerouslySetInnerHTML={{ __html: formField.text }}
    />
  );
}
