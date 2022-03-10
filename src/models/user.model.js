const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [64, 'Name must have fewer than 64 characters'],
      minlength: [4, 'Name cannot be empty'],
    },
    email: {
      type: String,
      required: [true, 'Email cannot be empty'],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid.');
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Password cannot be empty'],
      trim: true,
      minlength: 7,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// JWT token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY || 'thisisyourkey',
    { expiresIn: process.env.JWT_EXPIRY || '2d' }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Finding email and comparing password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect Password');
  }

  return user;
};

// Hash Password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
    user.confirmPassword = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
