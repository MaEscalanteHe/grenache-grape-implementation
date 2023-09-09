## Execution

```bash
yarn global add grenache-grape

# boot two grape servers
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'

yarn install

# run server
node src/sercer/server.js
```

## Client Commands

Run the CLI

```bash
node src/app.js
```

- `--get-ob <client-id>`: Get the remote order book.
- `--add-order <client-id> <side> <price> <quantity>`: Add a new order.

Example:

```bash
node src/app.js --add-order User sell 100 10
```

# Current status

- Each client has its own instance of an order book.
- Clients can submit orders to their local order books.
- When a client submits an order, it is distributed to other instances of order books.

### Current Limitations

- The order matching logic is basic and can be improved.
- Authentication or authorization systems have not been implemented.
- The system lacks data persistence.
- Scalability and performance may be limited in its current state.

### Order book status

The order book in this implementation is designed to maintain a real-time record of a buy and sell orders submitted by clients. This implementation provides a basic order book status.

- Buy Orders: A list of buy orders submitted by clients. Each buy orders includes details such as the order ID, price, quantity, and the client ID of the buyer.

- Sell Orders: A list of sell orders submitted by clients. each sell order includes essential information similar to buy order, includes client ID of the seller.

## Client status

### Submitting orders

- **Order Submission**: Clients can submit orders to their local order book.
- **Distributed Order**: The submitted order is not only stored locally but is also distributed to other instances of order books in the system. This allows all clients to be aware of new orders.

### Receiving Notifications

- **Order book update**: If a client's order book is submitted, the system notifies the other clients of the changes made.

### Client Interactions

- Clients interact with the system through command-line commands, as detailed in the "Usage" section of this README. They can retrieve their order books and submit orders.

# Things to do if more time had been provided

#### Order Matching:

- The order book is responsible for matching buy and sell orders based on predefined criteria, such as price and order type (buy or sell). When a match occurs, the relevant orders are executed, and any remaining quantity is added back to the order book.

- The system continuously checks for order matches between buy and sell orders submitted by different clients. When a match occurs, the relevant orders are executed.

#### Remaining Orders:

- If a client's order matches with another order, any remaining quantity is added back to the local order book. This ensures that clients have an accurate representation of their order status.

#### Adding funcionality to the CLI

- A way to visualize the execution of each client's orders.
