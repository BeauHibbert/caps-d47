'use strict';

const { Server } = require('socket.io');
const PORT = process.eventNames.PORT || 3002;
const Queue = require('./lib/queue');

const server = new Server(PORT);
const messages = server.of('/messages');
const messageQueue = new Queue();

messages.on('connection', (socket) => {
  console.log('joined the messages name space', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  });

  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('MESSAGE', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey)
    }
    currentQueue.store(payload.messageId, payload);
    messages.emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created for this message');
    }
    let message = currentQueue.remove(payload.messageId);
    messages.to(payload.queueId).emit('RECEIVED', message);
  });

  socket.on('GET_MESSAGES', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    Object.keys(currentQueue.data).forEach(messageId => {
      messages.emit('MESSAGE', currentQueue.read(messageId));
    });
  });
});

module.exports = {
  onWidgetPickup: (storename) => {
    const payload = {
      store: storename,
      orderId: chance.guid(),
      customer: chance.name(),
      address: `${chance.city()}, ${chance.state()}`,
    };
    eventPool.emit('PICKUP', payload);
  }
};
