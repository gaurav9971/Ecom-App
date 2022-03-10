const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema();

const Orders = mongoose.model('Product', orderSchema);
module.exports = Orders;
