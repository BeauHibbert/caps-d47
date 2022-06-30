'use strict';

const eventPool = require('../eventPool.js');
const { onFlowerPickup } = require('./vendor/1-800-flowers');
const { onWidgetPickup } = require('./vendor/acme-widgets');
const { onDelivery } = require('./driver/handleDriver');
const { onReceived } = require('./queue-server');
const { onGetAll } = require('./queue-clients/recipient');
const logger = require('./logger');

module.exports = () => {
  eventPool.on('PICKUP', onPickup);
  eventPool.on('DELIVERY', onDelivery);
  eventPool.on('PICKUP', (payload) => {
    logger('PICKUP', payload)
  });
  eventPool.on('IN TRANSIT', (payload) => {
    logger('IN TRANSIT', payload)
  });

  eventPool.on('DELIVERY', (payload) => {
    logger('DELIVERY', payload)
  });

  eventPool.on('RECEIVED', onReceived);
  eventPool.on('GET_ALL', onGetAll);
};
