const Order = require('../models/Order');

// Ellaa orders-ah get pannum function
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

// Oru user-oda orders-ah get pannum function
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ useremail: req.query.useremail });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// Puthu order create pannum function
const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// Order status-ah update pannum function
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }  // Updated document return pannu
    );
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// Order-ah delete pannum function
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