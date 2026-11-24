import { notFound } from 'next/navigation';

export default function TestsLayout({ children }) {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <>
      {/* Must run synchronously before QUnit module code executes to prevent autostart */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'window.QUnit=window.QUnit||{};(window.QUnit.config=window.QUnit.config||{}).autostart=false;',
        }}
      />
      <link
        rel="stylesheet"
        href="https://code.jquery.com/qunit/qunit-2.24.1.css"
      />
      <div id="qunit"></div>
      <div id="react-testing-container">
        <div id="react-testing">
          <div id="root"></div>
        </div>
      </div>
      {children}
    </>
  );
}
