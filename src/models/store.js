import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import superMap from 'can-connect/can/super-map/';
import feathers from '~/models/feathers';

export const Store = DefineMap.extend('Store', {
    /**
     * @function findClosestOne
     *
     * Retrieve the store closest to a point.
     *
     * @param {Object} point A point as `{ lat, lon }`
     * @return {Promise} A find all promise
     */
    findClosestOne(point) {
      return Store.findAll({ $near: point })
        .then(stores => {
          console.log('Closest one store result:', stores[0])

          return stores[0];
        })
        .catch(error => console.error(error));
    }
  }, {
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
    createdAt: {
      serialize: false
    },
    updatedAt: {
      serialize: false
    },
    /**
     * @property {*} $near
     *
     * If a geolocation query is made then the original params will be here.
     * e.g. `Store.findClosestOne`
     */
    $near: {
      serialize: false
    }
  }
);

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
