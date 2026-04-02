import { Link } from 'react-router-dom';

export default function MainNav({ isMenuToggled }) {
  return (
    <>
      <div class={`AddonDocs-DocsViewer-Nav docs-bg-grey-lightest docs-border-r docs-flex-no-shrink${isMenuToggled ? ' show-mobile' : ''}`}>
        <nav
          class="
      docs-absolute docs-right-0 docs-shadow-lg md:docs-shadow-none docs-mr-2 md:docs-mr-0 md:docs-pl-2
      docs-max-w-xs docs-w-90% md:docs-w-72 docs-z-10 docs-transition md:docs-sticky md:docs-top-0
    "
        >
          <div class="docs-pt-px docs-mb-8 docs-px-3 md:docs-px-4 md:docs-max-h-screen md:docs-overflow-y-scroll">
            <ul>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Introduction
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Index"
                  to="/docs"
                >
                  Introduction
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Basic usage"
                  to="/docs/basic-usage"
                >
                  Basic usage
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Validation
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Field validation"
                  to="/docs/field-validation"
                >
                  Field validation
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Integrating custom validators"
                  to="/docs/integrating-custom-validators"
                >
                  Integrating custom validators
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Form &amp; field settings
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Form settings"
                  to="/docs/form-settings"
                >
                  Form settings
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Field settings"
                  to="/docs/field-settings"
                >
                  Field settings
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Form &amp; field methods
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Form methods"
                  to="/docs/form-methods"
                >
                  Form methods
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Field methods"
                  to="/docs/field-methods"
                >
                  Field methods
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Hiding and showing fields
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Hiding and showing fields"
                  to="/docs/hiding-and-showing-fields"
                >
                  Hiding and showing fields
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Clonable form fields
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Clonable form fields"
                  to="/docs/clonable-form-fields"
                >
                  Clonable form fields
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Built in fields
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-brand docs-font-medium docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Input"
                  to="/docs/input"
                >
                  Input
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Textarea"
                  to="/docs/textarea"
                >
                  Textarea
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Single checkbox"
                  to="/docs/single-checkbox"
                >
                  Single checkbox
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Radio button group"
                  to="/docs/radio-button-group"
                >
                  Radio button group
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Checkbox group"
                  to="/docs/checkbox-group"
                >
                  Checkbox group
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Static content field"
                  to="/docs/static-content-field"
                >
                  Static content field
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Clicker"
                  to="/docs/clicker"
                >
                  Clicker
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Creating custom fields
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Creating custom fields"
                  to="/docs/creating-custom-fields"
                >
                  Creating custom fields
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Form submission
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Form submission"
                  to="/docs/form-submission"
                >
                  Form submission
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Action handling
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Action handling"
                  to="/docs/action-handling"
                >
                  Action handling
                </Link>
              </li>
              <li
                class="
  docs-mt-8 docs-capitalize
  "
              >
                Configuration options
              </li>

              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Manipulating element class names and attrs"
                  to="/docs/manipulating-element-class-names-and-attrs"
                >
                  Manipulating element class names and attrs
                </Link>
              </li>
              <li class="docs-mt-2 docs-ml-4 docs-mb-1 docs-flex docs-items-center docs-text-sm">
                <Link
                  class="ember-view docs-text-grey-darker docs-no-underline hover:docs-underline"
                  data-test-id="nav-item"
                  data-test-label="Debug mode"
                  to="/docs/debug-mode"
                >
                  Debug mode
                </Link>
              </li>
            </ul>
            <div class="docs-mt-16 lg:docs-mb-16 docs-mr-2 docs-text-xxs docs-rounded"></div>
          </div>
        </nav>
      </div>
    </>
  );
}
