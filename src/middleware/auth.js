const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  try {
    const token = authHeader.replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'User is  not authorized' });
  }
};

const admin = async (req, res, next) => {};

module.exports = { auth, admin };
