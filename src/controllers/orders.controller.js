const Orders = require('../models/orders.model');

// CREATE ORDER
async function createOrder(req, res) {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new Orders({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
  });

  try {
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET LOGIN ORDERS
async function getLoginOrders(req, res) {
  try {
    const orders = await Orders.find({ user: req.user._id });
    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// GET ALL ORDERS (ADMIN)
async function getAllOrders(req, res) {
  try {
    const orders = await Orders.find({});
    res.send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
}

// GET INDIVIDUAL ORDER (ADMIN)
async function getOrderById(req, res) {
  const id = req.params.id;

  try {
    const order = await Orders.findById(id).populate('user', 'name email');

    if (!order) {
      return res.status(404).send({ message: 'Order not found!' });
    }

    res.send(order);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { createOrder, getLoginOrders, getAllOrders, getOrderById };
