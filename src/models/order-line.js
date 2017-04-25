import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';

export const OrderLine = DefineMap.extend({
  _id: 'string',
  order: 'string',
  store: 'string',
  product: 'string',
  quantity: {
    value: 1
  },
  createdAt: {
    serialize: false
  },
  updatedAt: {
    serialize: false
  }
});

OrderLine.List = DefineList.extend({
  '*': OrderLine
});

export const orderLineConnection = superMap({
  url: feathers.socketio('order-lines'),
  idProp: '_id',
  Map: OrderLine,
  List: OrderLine.List,
  name: 'orderLine'
});

// Connect to realtime events.
feathers.io.on('order-lines created', orderLine => orderLineConnection.createInstance(orderLine));
feathers.io.on('order-lines updated', orderLine => orderLineConnection.updateInstance(orderLine));
feathers.io.on('order-lines patched', orderLine => orderLineConnection.updateInstance(orderLine));
feathers.io.on('order-lines removed', orderLine => orderLineConnection.destroyInstance(orderLine));

export default OrderLine;
