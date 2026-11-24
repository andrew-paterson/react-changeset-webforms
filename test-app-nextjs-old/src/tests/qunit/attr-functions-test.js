import { visit, click, waitFor } from 'react-qunit/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'react-qunit';

module('Acceptance | Configuring class names', function (hooks) {
  setupApplicationTest(hooks);

  test('Attr functions', async function (assert) {
    await visit('/docs/manipulating-element-class-names-and-attrs');
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn-primary:not(.btn-success)',
      )
      .exists(
        'Submit button has class btn-primary and does not have class btn-success on load.',
      );
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn.d-inline-flex',
      )
      .exists(
        'Submit button correctly receives class names from `buttonElement` config namespace.',
      );
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].form-submit-button.btn-lg',
      )
      .exists(
        'Submit button correctly receives class names from `submitButton` config namespace.',
      );

    click(
      '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"]',
    );
    await waitFor(
      '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn-success:not(.btn-primary)',
    );
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn-success:not(.btn-primary)',
      )
      .exists(
        'Submit button has class btn-success and does not have class btn-primary when submit is clicked.',
      );
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn.d-inline-flex.form-submit-button.btn-lg',
      )
      .exists(
        'Submit button has class names from non function configs after classes updated by submitButtonFn.',
      );
    await waitFor(
      '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"]:not(.btn-success)',
      { timeout: 5000 },
    );
    assert;
    assert
      .dom(
        '[data-test-id="attr-functions"] [data-test-id="cwf-submit-form-button"].btn-primary:not(.btn-success)',
      )
      .exists(
        'Submit button has class btn-primary and does not have class btn-success after submit action resolves.',
      );
    assert
      .dom('[data-test-id="attr-functions-form-name-field-label"]')
      .includesText(
        'Label loaded at',
        'Field label has text content set by attr function from form field config on load.',
      );
  });
});
