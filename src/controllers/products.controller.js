const Products = require('../models/products.model');

// GET ALL PRODUCTS
async function getAllProducts(req, res) {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// GET INDIVIDUAL PRODUCT
async function getProductById(req, res) {
  const id = req.params.id;

  try {
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found!' });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// CREATE PRODUCT (ADMIN)
async function createProduct(req, res) {
  const product = await Products(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// UPDATE PRODUCT (ADMIN)
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;

    const product = await Products.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found!' });
    }

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// DELETE PRODUCT (ADMIN)
async function deleteProduct(req, res) {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found!' });
    }

    res.send({ message: 'Successfully deleted the product!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
