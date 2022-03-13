const express = require('express');
const { auth, admin } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  logoutUser,
  logoutAllDevices,

  getAllUsers,
  deleteUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', auth, userProfile);
userRouter.patch('/:id', auth, updateProfile);
userRouter.post('/logout', auth, logoutUser);
userRouter.post('/logoutall', auth, logoutAllDevices);

userRouter.get('/admin/users', auth, admin, getAllUsers);
userRouter.delete('/admin/delete', auth, admin, deleteUser);

module.exports = { userRouter };
