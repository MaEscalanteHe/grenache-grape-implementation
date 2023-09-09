class Order {
  constructor(id, type, price, quantity, clientId) {
    this.id = id;
    this.type = type; // buy or sell
    this.price = price;
    this.quantity = quantity;
    this.clientId = clientId;
  }
}

class OrderBook {
  constructor() {
    this.orders = [];
    this.buyOrders = [];
    this.sellOrders = [];
  }

  addOrder(order) {
    this.orders.push(order);
    if (order.type === 'buy') {
      this.buyOrders.push(order);
      this.buyOrders.sort((a, b) => b.price - a.price);
    }
    if (order.type === 'sell') {
      this.sellOrders.push(order);
      this.sellOrders.sort((a, b) => a.price - b.price);
    }
  }

  findOrder(orderId, orderType) {
    return this.orders.find(
      (order) => order.id === orderId && order.type === orderType,
    );
  }

  findOrdersByClientId(clientId) {
    return this.orders.filter((order) => order.clientId === clientId);
  }
}

module.exports = {
  Order,
  OrderBook,
};
