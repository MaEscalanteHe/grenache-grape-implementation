const { Order, OrderBook } = require('./orderbook');
const { peer: exchangeWorkerPeer } = require('./workers/exchange-worker');
const { v4 } = require('uuid');

class Client {
  constructor(clientId, orderBook) {
    this.clientId = clientId;
    this.orderBook = orderBook;
    this.peer = exchangeWorkerPeer;
  }

  registerForServerNotifications() {
    this.peer.request(
      'exchange-worker',
      { action: 'register', clientId: this.clientId },
      { timeout: 10000, compress: true },
      (err, data) => {
        if (err) {
          console.error('Error registering for notifications:', err);
          process.exit(-1);
        }
        console.log('Registered for notifications:', data);
      },
    );
  }

  handleServerNotification() {
    this.peer.on('exchange-worker', (rid, key, payload, handler) => {
      if (payload.action === 'notify') {
        console.log('Server Notification:', payload.message);
      }
    });
  }

  getClientData() {
    return {
      clientId: this.clientId,
      orderBook: this.orderBook,
    };
  }

  sendOrder(type, price, quantity) {
    const orderId = this.generateOrderId();
    const order = new Order(orderId, type, price, quantity, this.clientId);

    this.orderBook.addOrder(order);
    this.distributeOrder(order);
  }

  // TODO: Implement these methods
  // handleMatchedOrder(matchedOrder) {
  // }

  // handleRemainingOrder(remainingOrder) {
  // }

  generateOrderId() {
    return v4();
  }

  getOrderBook() {
    return this.orderBook;
  }

  getRemoteOrderBook(clientId) {
    return this.peer.request(
      'exchange-worker',
      { action: 'pull', clientId },
      { timeout: 10000, compress: true },
      (err, data) => {
        if (err) {
          console.error(`Error get remote order book`, err);
          process.exit(-1);
        }
        console.log(data);
      },
    );
  }

  distributeOrder(order) {
    const orderData = {
      orderId: order.id,
      type: order.type,
      price: order.price,
      quantity: order.quantity,
      clientId: this.clientId,
    };

    this.peer.request(
      'exchange-worker',
      { action: 'push', orderData },
      { timeout: 10000, compress: true },
      (err, data) => {
        if (err) {
          console.error('Error distribute order', err);
          process.exit(-1);
        }
        console.log(data);
      },
    );
  }

  getClientPeer() {
    return this.peer;
  }
}

module.exports = Client;
