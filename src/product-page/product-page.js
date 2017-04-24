import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './product-page.stache';
import _startCase from 'lodash/startCase';

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
   * @property {String} closestStoreName
   *
   * The formatted name of the geographically closest store.
   *
   * TODO - This is a good candidate for a helper.
   */
  get closestStoreName() {
    const closestStore = this.app.closestStore;

    if (closestStore) {
      return _startCase(closestStore.storeName.toLowerCase());
    }
  },
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
