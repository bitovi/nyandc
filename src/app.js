import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import Store from '~/models/store';

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
  },
  /**
   * @property {Boolean} hasGeolocation
   *
   * Whether the client has the geolocation api.
   */
  get hasGeolocation() {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  },
  /**
   * @property {Store} closestStore
   *
   * The store closest to the user.
   */
  closestStore: {
    serialize: false,
    value: undefined
  },
  /**
   * @function init
   *
   * When the application loads:
   * - Look up the customer's location and find their closest store.
   */
  init() {
    if (window) {
      window.appState = this;
    }

    if (this.hasGeolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        Store.findAll({ lon, lat })
          .then(stores => {
            this.closestStore = stores[0];

            return stores;
          })
          .catch(error => console.error(error));
      },
      error => console.error(error));
    }
  }
});

export default AppViewModel;
