const Order = require('../models/Order');

// Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

// Get orders by user email
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ useremail: req.query.useremail });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// Create new order(s)
const createOrder = async (req, res, next) => {
  try {
    const ordersData = Array.isArray(req.body) ? req.body : [req.body];
    const orders = await Order.insertMany(ordersData);
    res.status(201).json({
      success: true,
      message: orders.length > 1 ? 'Orders created successfully' : 'Order created successfully',
      orders
    });
  } catch (err) {
    next(err);
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// Delete order
const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
