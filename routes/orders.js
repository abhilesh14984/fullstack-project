const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');

// Get user orders
router.get('/:username/orders', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('orders');
    res.json(user.orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new order
router.post('/:username/orders', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const order = new Order({ items: req.body.items, user: user._id });
    await order.save();
    user.orders.push(order);
    await user.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
