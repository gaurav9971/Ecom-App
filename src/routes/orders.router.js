const express = require('express');
const { auth } = require('../middleware/auth');
const {
  createOrder,
  getOrderById,
  getLoginOrders,
  getAllOrders,
} = require('../controllers/orders.controller');

const ordersRouter = express.Router();

ordersRouter.post('/orders', auth, createOrder);
ordersRouter.get('/orders/me', auth, getLoginOrders);

ordersRouter.get('/orders/:id', getOrderById);
ordersRouter.get('/admin/orders', getAllOrders);

module.exports = { ordersRouter };
