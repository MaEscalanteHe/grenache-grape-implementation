'use strict';

const { v4 } = require('uuid');

const Client = require('./client');
const { OrderBook } = require('./orderbook');

/**
 * Main function to handle the command-line interface (CLI) for managing the client.
 */
const main = () => {
  const arg = process.argv[2];
  let clientId = process.argv[3];

  if (!clientId || clientId === '--help') {
    console.log('Usage:');
    console.log('  app.js --get-ob <client-id>');
    console.log('  app.js --add-order <client-id> <side> <price> <quantity>');
    console.log('  app.js --help');
    process.exit(1);
  }

  const client = new Client(clientId || v4(), new OrderBook());
  // client.registerForServerNotifications();

  if (arg === '--get-ob') {
    console.log('Getting order book...');
    client.getRemoteOrderBook();
  } else if (arg === '--add-order') {
    const side = process.argv[4];
    const price = parseFloat(process.argv[5]);
    const quantity = parseFloat(process.argv[6]);

    // Check if required arguments are missing.
    if (!side || !price || !quantity) {
      console.error('Missing arguments to add an order.');
      process.exit(1);
    }

    console.log(
      `Adding order: Side: ${side}, Price: ${price}, Quantity: ${quantity}`,
    );
    client.sendOrder(side, price, quantity);
  } else {
    console.log('Unrecognized command. Run "app.js --help" to see the usage.');
  }
};

main();
