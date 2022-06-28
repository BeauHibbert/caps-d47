'use strict';

const eventPool = require('../eventPool');

module.exports = {
  onDelivery: (payload) => {
    console.log('payload coming into handleDriver: ', payload);
    console.log(`DRIVER: picked up order # ${payload.orderId}`);
    eventPool.emit('IN TRANSIT', payload);
    console.log(`DRIVER: delivered order # ${payload.orderId}`);
    eventPool.emit('DELIVERED', payload);
    console.log(`Thank you, ${payload.customer}`);
  }
};
