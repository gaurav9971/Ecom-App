const express = require('express');
const { ordersRouter } = require('./orders.router');
const { productsRouter } = require('./products.router');
const { userRouter } = require('./user.router');

const api = express.Router();

api.use('/', userRouter);
api.use('/products', productsRouter);
api.use('/', ordersRouter);

module.exports = api;
