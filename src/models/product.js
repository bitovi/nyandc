import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';

export const Product = DefineMap.extend({
  _id: 'string',
  baseProductId: 'string',
  name: 'string',
  description: 'string',
  createdAt: Date,
  updatedAt: Date
});

Product.List = DefineList.extend({
  '*': Product
});

export const productConnection = superMap({
  url: feathers.socketio('products'),
  idProp: '_id',
  Map: Product,
  List: Product.List,
  name: 'product'
});

// Connect to realtime events.
feathers.io.on('products created', product => productConnection.createInstance(product));
feathers.io.on('products updated', product => productConnection.updateInstance(product));
feathers.io.on('products patched', product => productConnection.updateInstance(product));
feathers.io.on('products removed', product => productConnection.destroyInstance(product));

export default Product;