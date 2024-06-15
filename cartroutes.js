// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Example storage for cart data (replace with database storage in production)
let carts = {};

// Endpoint to add an item to the cart
app.post('/cart/:userId/add', (req, res) => {
  const userId = req.params.userId;
  const { itemId, itemName, price, quantity } = req.body;

  // Check if the user has a cart, create one if not
  if (!carts[userId]) {
    carts[userId] = [];
  }

  // Check if the item is already in the cart, update quantity if so
  const existingItemIndex = carts[userId].findIndex(item => item.itemId === itemId);
  if (existingItemIndex !== -1) {
    carts[userId][existingItemIndex].quantity += quantity;
  } else {
    // Otherwise, add the item to the cart
    carts[userId].push({ itemId, itemName, price, quantity });
  }

  res.status(200).send('Item added to cart');
});

// Endpoint to remove an item from the cart
app.delete('/cart/:userId/remove/:itemId', (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  if (carts[userId]) {
    carts[userId] = carts[userId].filter(item => item.itemId !== itemId);
    res.status(200).send('Item removed from cart');
  } else {
    res.status(404).send('Cart not found');
  }
});

// Endpoint to get the user's cart
app.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  res.status(200).json(cart);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

