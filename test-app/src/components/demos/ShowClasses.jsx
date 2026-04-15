import React from 'react';

export default function ShowClasses({ children }) {
  const containerRef = React.useRef(null);

  function doTheThing() {
    const ignoreEls = [
      {
        attr: 'data-test-id',
        value: 'form-class-names-form-name-field-label',
      },
    ];
    const showAfterEls = [
      {
        attr: 'data-test-id',
        value: 'cwf-submit-form-button',
      },
    ];

    const labelEls = Array.from(document.querySelectorAll('[data-test-class="cwf-field-label"]')).concat(Array.from(document.querySelectorAll('[data-test-labelled-radio-button] label')));

    labelEls.forEach((labelEl) => {
      for (const ignoreEl of ignoreEls) {
        if (labelEl.getAttribute(ignoreEl.attr) === ignoreEl.value) {
          return;
        }
      }

      let showAfter = false;
      for (const showAfterEl of showAfterEls) {
        if (labelEl.getAttribute(showAfterEl.attr) === showAfterEl.value) {
          showAfter = true;
        }
      }

      const newTextContent = `class="${labelEl.className}"`;
      const existing = labelEl.querySelector('.element-classlist');
      if (existing) {
        existing.textContent = newTextContent;
        return;
      }

      const newEl = document.createElement('span');
      newEl.textContent = newTextContent;
      newEl.classList.add('monospaced');
      newEl.classList.add('inline-block');
      newEl.classList.add('element-classlist');
      newEl.classList.add('ms-1');
      newEl.classList.add('rounded');
      newEl.classList.add('box-arrow');

      if (showAfter) {
        labelEl.after(newEl);
      } else {
        labelEl.appendChild(newEl);
      }

      if (newEl.getBoundingClientRect().height > 35) {
        newEl.classList.add('arrow-direction-up');
      } else {
        newEl.classList.add('arrow-direction-left');
      }
    });
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const inputs = containerRef.current ? containerRef.current.querySelectorAll('[data-test-cwf-field] input') : [];
      Array.from(inputs).forEach((el) => {
        el.addEventListener('change', doTheThing);
        el.addEventListener('keyup', doTheThing);
        el.addEventListener('blur', doTheThing);
      });

      const buttons = containerRef.current ? containerRef.current.querySelectorAll('[data-test-id="cwf-submit-form-button"]') : [];
      Array.from(buttons).forEach((el) => {
        el.addEventListener('click', doTheThing);
      });

      doTheThing();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
