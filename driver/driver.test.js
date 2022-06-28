'use strict';

const driver = require('./handleDriver');
const eventPool = require('../eventPool');


jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});

const mockPayload = {store: 'test store', orderId: 12345, customer: 'test mctesterson', address: 'Seattle, WA' };

describe('Driver module test', () => {

  console.log = jest.fn();

  test('Emit the IN TRANSIT event', () => {
    driver.onDelivery(mockPayload);
   
    expect(eventPool.emit).toHaveBeenCalledWith('IN TRANSIT', mockPayload);
  });
  test('Emit the DELIVERED event', () => {
    driver.onDelivery(mockPayload);
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', mockPayload);
  });
  test('Log thank you message', () => {
    driver.onDelivery(mockPayload);
    expect(console.log).toHaveBeenCalledWith(`Thank you, ${mockPayload.customer}`);
  })
})

