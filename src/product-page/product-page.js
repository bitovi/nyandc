import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './product-page.stache';
import _startCase from 'lodash/startCase';
import Product from '~/models/product';
import Inventory from '~/models/inventory';

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
   * @property {String} baseProductId
   *
   * The baseProductId for the product to display.
   */
  baseProductId: 'string',
  /**
   * @property {Product} product
   *
   * The product to display.
   */
  product: {
    get(lastSet, resolve) {
      const baseProductId = this.baseProductId;

      Product.findAll({ baseProductId })
        .then(products => resolve(products[0]))
        .catch(error => console.error(error));
    }
  },
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
   * @property {Number} availableLocal
   *
   * The product stock at the closest store.
   */
  availableLocal: {
    get(lastSet, resolve) {
      const closestStore = this.app.closestStore;
      const product = this.product;

      if (closestStore && product) {
        Inventory.findAll({ store: closestStore._id, product: product._id })
          .then(inventory => {
            if (inventory[0]) {
              resolve(inventory[0].available);
            }
          })
          .catch(error => console.error(error));
      }
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
