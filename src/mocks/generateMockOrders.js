const { Order, OrderBook } = require('../orderbook');

const mockOrders = [
  new Order('1', 'buy', 100, 10),
  new Order('2', 'buy', 98, 5),
  new Order('3', 'sell', 105, 8),
  new Order('4', 'sell', 110, 12),
  new Order('5', 'buy', 97, 7),
  new Order('6', 'sell', 108, 6),
  new Order('7', 'buy', 99, 9),
  new Order('8', 'sell', 112, 15),
  new Order('9', 'buy', 101, 11),
  new Order('10', 'sell', 106, 10),
];

const orderBook = new OrderBook();
mockOrders.forEach((order) => orderBook.addOrder(order));

module.exports = { orderBook };
