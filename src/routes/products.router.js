const express = require('express');
const { auth, admin } = require('../middleware/auth');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProductById);

productsRouter.post('/create', auth, admin, createProduct);
productsRouter.patch('/update/:id', auth, admin, updateProduct);
productsRouter.delete('/delete/:id', auth, admin, deleteProduct);

module.exports = { productsRouter };
