'use client';

import QueryPreservingLink from './QueryPreservingLink.jsx';

export default function Header() {
  return (
    <header class="docs-shadow docs-relative docs-z-40 docs-bg-white">
      <div class="docs-flex docs-items-center docs-max-w-site-container docs-mx-auto md:docs-px-2">
        <a
          class="ember-view docs-px-4 docs-py-5 docs-transition docs-uppercase docs-text-xxs
          docs-font-bold docs-no-underline docs-text-grey-darkest"
          href="/"
        >
          <span class="docs-leading-none docs-font-title docs-text-large-2 docs-font-normal docs-normal-case docs-block docs-mr-6">
            <div class="docs-text-xxs">React</div>
            Changeset Webforms
          </span>
        </a>
        <div class="docs-flex-1 docs-flex docs-items-center docs-overflow-auto docs-scrolling-touch docs-mask-image md:docs-no-mask-image">
          <QueryPreservingLink
            class="ember-view active docs-px-4 docs-py-5 docs-transition docs-uppercase docs-text-xxs
          docs-font-bold docs-no-underline docs-text-brand"
            href="/docs"
          >
            Documentation
          </QueryPreservingLink>
          <div class="docs-ml-auto">
            <div
              class="docs-relative docs-text-grey-darkest"
              data-search-box=""
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                class="docs-absolute docs-top-0 docs-h-full docs-ml-1"
              >
                <title>search</title>
                <path
                  d="M23.997 40.742c-9.249 0-16.746-7.497-16.746-16.745 0-9.248 7.497-16.745 16.746-16.745 9.248 0 16.746 7.497 16.746 16.745a16.674 16.674 0 01-16.746 16.745zm38.885 16.93L43.534 38.32a23.59 23.59 0 004.65-14.328 24.092 24.092 0 10-39.67 18.475 24.092 24.092 0 0029.807 1.065l19.353 19.35a3.6 3.6 0 005.212 0 3.6 3.6 0 00-.004-5.211z"
                  fillRule="nonzero"
                ></path>
              </svg>
            </div>
          </div>

          <a
            href="#"
            class="docs-px-4 docs-py-5 docs-transition docs-uppercase docs-text-xxs docs-font-bold docs-text-grey-darkest docs-no-underline hover:docs-text-brand"
          >
            <span
              data-test-id="current-version"
              class="docs-flex docs-items-center"
            >
              0.0.5
            </span>
          </a>

          <a
            href="https://github.com/andrew-paterson/react-changeset-webforms"
            class="docs-px-4 docs-py-5 docs-transition docs-uppercase docs-text-xxs docs-font-bold docs-text-grey-darkest docs-no-underline hover:docs-text-brand"
          >
            <span class="docs-flex">
              <svg
                class="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="24"
                height="24"
              >
                <title>GitHub</title>
                <path d="M10 0a10 10 0 00-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 01.1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0010 0"></path>
              </svg>
            </span>
          </a>

          <div class="docs-h-px docs-px-3 sm:docs-hidden"></div>
        </div>
      </div>
    </header>
  );
}
