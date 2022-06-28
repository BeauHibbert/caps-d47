'use strict';


const vendor = require('./handleVendor');
const eventPool = require('../eventPool');


jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});

describe('Vendor module test', () => {

  console.log = jest.fn();

  test('log and emit PICKUP event', () => {
    vendor.onPickup('test store');

    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', expect.objectContaining({store: 'test store'}));
  });
});
