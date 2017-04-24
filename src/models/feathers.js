import Feathers from 'can-connect-feathers';
import config from '~/config';
import $ from 'jquery';

const feathers = new Feathers({
  url: config.api,
  idProp: '_id',
  allowSocketIO: true,
  storage: window.localStorage,
  jquery: $
});

export default feathers;
