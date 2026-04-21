# React Changeset Webforms

Abstracts web form templating into a single component — a form is described as a data structure, passed to the component, and it handles the rest.

## Specific features

- Adding validation rules to form fields.
- Controlling the events that trigger validation on a field.
- Fires a range of optional callback functions in response to various events.
- Repeatable fields.
- Hiding or showing fields explicitly, or based on the value of other fields.
- Accessibility attributes are added where required.

The library code is in `./react-changeset-webforms`.

Full documentation and live demos at [https://react-changeset-webforms-test-app-n.vercel.app/](https://react-changeset-webforms-test-app-n.vercel.app/).

## Running tests

### QUnit tests

These form the majority of the library tests and run in the browser.

`cd test-app-nextjs`

`pnpm run dev`

Then visit `/tests`

### Vitest component tests

`cd test-app-nextjs`

`pnpm test:integration`
