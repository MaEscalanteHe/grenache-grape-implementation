'use strict';

const { PeerRPCServer } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');

const { orderBook: mockOrderBook } = require('../mocks/generateMockOrders');
const { secureOpts, isAllowedAction } = require('./secure');
const { OrderBook } = require('../orderbook');

const clients = {};

// let mockOrders = mockOrderBook.orders;
let orderBook = new OrderBook();

const link = new Link({
  grape: 'http://127.0.0.1:30001',
});
link.start();

const sendNotification = (clientId, message) => {
  if (clients[clientId]) {
    clients[clientId].request(
      'notification',
      message,
      { timeout: 10000 },
      (err, data) => {
        if (err) {
          console.error('Error sending notification:', err);
        }
      },
    );
  }
};

const peer = new PeerRPCServer(link, {
  secure: secureOpts,
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport('server');
service.listen(port);

setInterval(function () {
  link.announce('exchange-worker', service.port, {});
}, 1000);

console.log(`exchange-worker listening on port: ${service.port}`);

service.on('request', (rid, key, payload, handler) => {
  if (payload.action === 'register') {
    clients[payload.clientId] = handler;

    handler.reply(null, 'Registered');
  }

  if (payload.action === 'push') {
    orderBook.addOrder(payload.orderData);

    const notificationMessage = 'Orderbook updated';
    for (let clientId in clients) {
      sendNotification(clientId, notificationMessage);
    }
    handler.reply(null, orderBook);
  }

  if (payload.action === 'pull') {
    const clientId = payload.clientId;
    const clientOrderBook = orderBook.findOrdersByClientId(clientId);
    handler.reply(null, clientOrderBook);
  }

  console.log(orderBook);
});
