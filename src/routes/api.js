const express = require('express');
const { productsRouter } = require('./products.router');
const { userRouter } = require('./user.router');

const api = express.Router();

api.use('/', userRouter);
api.use('/products', productsRouter);

module.exports = api;
