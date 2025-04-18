const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
router.get('/', getAllOrders);
router.get('/user', getUserOrders);
router.post('/', createOrder)
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
