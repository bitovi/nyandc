import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './product-page.stache';

export const ViewModel = DefineMap.extend({
  /**
   * @property {Map} app
   *
   * The application's view model.
   */
  app: {
    Value: DefineMap
  },
  /**
   * @property {String} productId
   *
   * The id for the product to display.
   */
  productId: 'string',
  /**
   * @function init
   *
   * Set the page title.
   *
   * TODO - Make this dynamic.
   */
  init() {
    this.app.title = "NY&C: Off-The-Shoulder Romper";
  }
});

export default Component.extend({
  tag: 'product-page',
  ViewModel,
  view
});
