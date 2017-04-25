import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';
import OrderLine from '~/models/order-line';

export const Order = DefineMap.extend({
  _id: 'string',
  status: 'string',
  lines: OrderLine.List,
  createdAt: Date,
  updatedAt: Date
});

Order.List = DefineList.extend({
  '*': Order
});

export const orderConnection = superMap({
  url: feathers.socketio('orders'),
  idProp: '_id',
  Map: Order,
  List: Order.List,
  name: 'order'
});

// Connect to realtime events.
feathers.io.on('orders created', order => orderConnection.createInstance(order));
feathers.io.on('orders updated', order => orderConnection.updateInstance(order));
feathers.io.on('orders patched', order => orderConnection.updateInstance(order));
feathers.io.on('orders removed', order => orderConnection.destroyInstance(order));

export default Order;
