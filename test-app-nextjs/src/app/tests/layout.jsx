'use client';

export default function TestsLayout({ children }) {
  return (
    <>
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
