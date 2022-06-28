'use strict'

const logEvent = (eventName, payload) => {
  console.log('EVENT: ', {
    event: eventName,
    time: Date.now(),
    payload
  })
};

module.exports = (eventName, payload) => { 
  logEvent(eventName, payload)
};
