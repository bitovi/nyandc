import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './product-page.stache';
import Product from '~/models/product';
import Inventory from '~/models/inventory';
import Order from '~/models/order';
import _startCase from 'lodash/startCase';
import _get from 'lodash/get';

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
        .then(products => resolve(products))
        .catch(error => console.error(error));
    }
  },
  /**
   * @productId {String} productId
   *
   * The internal db reference for the displayed product.
   */
  get productId() {
    return _get(this, 'product.0._id');
  },
  /**
   * @property {Store} closestStore
   *
   * The store that's geographically closest to the customer.
   */
  get closestStore() {
    return this.app.closestStore;
  },
  /**
   * @property {String} closestStoreName
   *
   * The formatted name of the geographically closest store.
   *
   * TODO - This is a good candidate for a helper.
   */
  get closestStoreName() {
    if (this.closestStore) {
      return _startCase(this.closestStore.storeName.toLowerCase());
    }
  },
  /**
   * @property {Number} availableLocal
   *
   * The product stock at the closest store.
   */
  availableLocal: {
    get(lastSet, resolve) {
      if (this.closestStore && this.productId) {
        Inventory.findAll({
          store: this.closestStore._id,
          product: this.productId
        })
        .then(inventory => resolve(inventory))
        .catch(error => console.error(error));
      }
    }
  },
  /**
   * @function placeOrder
   *
   * Create an order.
   */
  placeOrder() {
    const order = new Order({
      lines: [
        {
          store: this.closestStore._id,
          product: this.productId,
          quantity: 1
        }
      ]
    });

    return order.save().catch(error => console.error(error));
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
  view,
  helpers: {
    gtZero(value) {
      return value > 0;
    }
  }
});
