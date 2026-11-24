'use client';

// BEGIN-SNIPPET component-for-static-content-field.jsx
export default function ComponentForStaticContentField() {
  return (
    <>
      <div>Some custom HTML content</div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 30, height: 30, background: 'red' }} />
        <div style={{ width: 30, height: 30, background: 'blue' }} />
        <div style={{ width: 30, height: 30, background: 'green' }} />
      </div>
    </>
  );
}
// END-SNIPPET
