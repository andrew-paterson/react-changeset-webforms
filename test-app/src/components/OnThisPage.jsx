export default function OnThisPage() {
  return (
    <nav
      class="AddonDocs-DocsViewer-CurrentPageIndex docs-hidden xl:docs-block docs-flex-no-shrink docs-mr-auto"
      data-test-current-page-index=""
    >
      <div class="docs-sticky docs-top-0 docs-pt-4 docs-pb-8 docs-pr-8 docs-max-h-screen docs-overflow-y-scroll">
        <ul class="docs-border-l docs-border-grey-lighter docs-pl-6 docs-leading-normal">
          <li class="docs-mt-12 docs-text-grey docs-font-bold docs-tracking-wide docs-uppercase docs-text-xxs">On This Page</li>
          <li
            class="
          docs-leading-tight docs-tracking-tight
          docs-ml-0
          docs-mt-2
          docs-mt-0
        "
            data-test-index-item=""
          >
            <a
              href="#input-field-props"
              class="docs-text-grey-dark docs-font-semibold docs-no-underline hover:docs-underline docs-text-xxs"
            >
              Input field props
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
