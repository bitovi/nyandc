import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';

export const Inventory = DefineMap.extend({
  _id: 'string',
  store: 'string',
  product: 'string',
  available: 'number',
  createdAt: Date,
  updatedAt: Date
});

Inventory.List = DefineList.extend({
  '*': Inventory
});

export const inventoryConnection = superMap({
  url: feathers.socketio('inventory'),
  idProp: '_id',
  Map: Inventory,
  List: Inventory.List,
  name: 'inventory'
});

// Connect to realtime events.
feathers.io.on('inventory created', inventory => inventoryConnection.createInstance(inventory));
feathers.io.on('inventory updated', inventory => inventoryConnection.updateInstance(inventory));
feathers.io.on('inventory patched', inventory => inventoryConnection.updateInstance(inventory));
feathers.io.on('inventory removed', inventory => inventoryConnection.destroyInstance(inventory));

export default Inventory;
