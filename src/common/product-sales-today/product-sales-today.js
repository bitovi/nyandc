import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './product-sales-today.stache';

export const ViewModel = DefineMap.extend({
  /**
   * @property {Product} product
   *
   * The product for the product sales to display.
   */
  product: {
    Value: DefineMap
  }
});

export default Component.extend({
  tag: 'product-sales-today',
  ViewModel,
  view
});
