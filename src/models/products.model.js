const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    detailUrl: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model('Product', productSchema);
module.exports = Products;
