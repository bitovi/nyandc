import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './home-page.stache';
import Product from '~/models/product';
import _kebabCase from 'lodash/kebabCase';

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
   * @property {String} featuredBaseProductId
   *
   * The baseProductId for the featured product.
   */
  featuredBaseProductId: {
    value: 'A-prod10170024'
  },
  /**
   * @property {Product} featuredProduct
   *
   * The product to emphasize.
   */
  featuredProduct: {
    get(lastSet, resolve) {
      const baseProductId = this.featuredBaseProductId;

      Product.findAll({ baseProductId })
        .then(products => resolve(products))
        .catch(error => console.error(error));
    }
  },
  /**
   * @function init
   *
   * When the page loads:
   * - Set the page title.
   */
  init() {
    this.app.title = "Women's Clothes & Accessories | Shop at New York & Company";
  }
});

export default Component.extend({
  tag: 'home-page',
  ViewModel,
  view,
  helpers: {
    kebabCase(value) {
      return _kebabCase(value);
    }
  }
});
