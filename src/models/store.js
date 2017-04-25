import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';

export const Store = DefineMap.extend({
  _id: 'string',
  zoomLevel: 'number',
  dayHour7: 'string',
  dayHour6: 'string',
  dayHour5: 'string',
  dayHour4: 'string',
  dayHour3: 'string',
  dayHour2: 'string',
  dayHour1: 'string',
  latitude: 'number',
  longitude: 'number',
  location: { },
  postalCode: 'string',
  City: 'string',
  Mile: 'number',
  StreetAddress: 'string',
  StoreID: 'number',
  State: 'string',
  PhoneNumber: 'string',
  suburb: 'string',
  storeName: 'string',
  createdAt: Date,
  updatedAt: Date
});

Store.List = DefineList.extend({
  '*': Store
});

export const storeConnection = superMap({
  url: feathers.socketio('stores'),
  idProp: '_id',
  Map: Store,
  List: Store.List,
  name: 'store'
});

// Connect to realtime events.
feathers.io.on('stores created', store => storeConnection.createInstance(store));
feathers.io.on('stores updated', store => storeConnection.updateInstance(store));
feathers.io.on('stores patched', store => storeConnection.updateInstance(store));
feathers.io.on('stores removed', store => storeConnection.destroyInstance(store));

export default Store;
