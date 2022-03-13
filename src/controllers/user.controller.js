const User = require('../models/user.model');

// USER REGISTERATION
async function registerUser(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ message: 'User already registered' });
  }

  try {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// USER LOGIN
async function loginUser(req, res) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// USER PROFILE
async function userProfile(req, res) {
  res.send(req.user);
}

// UPDATE USER PROFILE
async function updateProfile(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
    } else {
      return res.status(404).send({ message: 'User not found!' });
    }

    await user.save();
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// USER LOGOUT
async function logoutUser(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send({ message: 'Successfully Logged Out!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// USER LOGOUT ALL DEVICES
async function logoutAllDevices(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
}

// GET ALL USERS (ADMIN)
async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// DELETE USER (ADMIN)
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    res.send({ message: 'Successfully deleted the product!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  logoutUser,
  logoutAllDevices,

  getAllUsers,
  deleteUser,
};
