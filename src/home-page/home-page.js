import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './home-page.stache';

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
   * @function init
   *
   * Set the page title.
   */
  init() {
    this.app.title = "Women's Clothes & Accessories | Shop at New York & Company";
  }
});

export default Component.extend({
  tag: 'home-page',
  ViewModel,
  view
});
