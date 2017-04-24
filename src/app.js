import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';

route('{page}', { page: 'home' });
route('{page}/{productId}');

const AppViewModel = DefineMap.extend({
  /**
   * @property {String} page
   *
   * The top level page to load.
   */
  page: 'string',
  /**
   * @property {String} productId
   *
   * The id for the product to display.
   */
  productId: 'string',
  /**
   * @property {String} title
   *
   * The title for the page currently displayed.
   */
  title: {
    value: 'NY&C',
    serialize: false
  }
});

export default AppViewModel;
