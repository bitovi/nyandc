import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './home-page.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the home-page component'
  }
});

export default Component.extend({
  tag: 'home-page',
  ViewModel,
  view
});
