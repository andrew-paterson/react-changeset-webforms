import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('basic-usage');
    this.route('configuration-options');
    this.route('creating-custom-fields');
    this.route('action-handling');
    this.route('form-settings');
    this.route('field-settings');
    this.route('form-submission');
    this.route('field-validation');
    this.route('integrating-custom-validators');
    this.route('clonable-form-fields');
    this.route('custom-components');
    this.route('manipulating-element-class-names-and-attrs');
    this.route('input');
    this.route('textarea');
    this.route('single-checkbox');
    this.route('radio-button-group');
    this.route('checkbox-group');
    this.route('static-content-field');
    this.route('clicker');
    this.route('hiding-and-showing-fields');
    this.route('form-methods');
    this.route('field-methods');
    this.route('debug-mode');
    this.route('test-helpers');
  });
  this.route('not-found', { path: '/*path' });
});

export default Router;
