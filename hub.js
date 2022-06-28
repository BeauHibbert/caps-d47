'use strict';

const eventPool = require('../eventPool.js');
const { onPickup } = require('./vendor/handleVendor');
const { onDelivery } = require('./driver/handleDriver');
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
};
