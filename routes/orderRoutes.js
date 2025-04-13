const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Fetch orders by user email
router.get('/user', orderController.getUserOrders);

// Create a new order
router.post('/', orderController.createOrder);

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
