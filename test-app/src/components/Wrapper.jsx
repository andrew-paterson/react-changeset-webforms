import OnThisPage from './OnThisPage';
import MainNav from './MainNav.jsx';

export default function Wrapper({ children }) {
  return (
    <div class="docs-viewer docs-flex docs-flex-1 __web-inspector-hide-shortcut__">
      <div class="md:docs-flex docs-w-full">
        <MainNav />

        <main class="docs-px-4 md:docs-px-8 lg:docs-px-20 docs-mx-auto md:docs-mx-0 docs-mt-6 md:docs-mt-12 md:docs-min-w-0 md:docs-flex-1">
          <div data-current-page-index-target="">
            <div class="docs-md">
              <h1
                id="input"
                class="docs-md__h1"
              >
                Input
              </h1>
              <p>Renders an HTML input.</p>
              {children}
            </div>
            <div class="docs-mt-16 docs-pb-16 docs-border-t docs-border-grey-lighter docs-pt-4 docs-flex">
              <div class="docs-w-1/2">
                <div class="docs-text-xs docs-text-grey-dark">Previous</div>
                <a
                  id="ember46"
                  class="ember-view docs-text-grey-darkest docs-text-large-4 docs-font-light docs-no-underline docs-border-b docs-border-grey hover:docs-border-grey-darkest docs-transition"
                  href="/docs/clonable-form-fields"
                >
                  Clonable form fields
                </a>
              </div>
              <div
                class="docs-w-1/2 docs-text-right"
                data-test-next-link=""
              >
                <div class="docs-text-xs docs-text-grey-dark">Next</div>
                <a
                  id="ember40"
                  class="ember-view docs-text-grey-darkest docs-text-large-4 docs-font-light docs-no-underline docs-border-b docs-border-grey hover:docs-border-grey-darkest docs-transition"
                  href="/docs/textarea"
                >
                  Textarea
                </a>
              </div>
            </div>
          </div>
        </main>
        <OnThisPage />
      </div>
    </div>
  );
}
