const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { createHash } = require('../utils/hash');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');

module.exports = {
  createUser: async (req, res, next) => {
    const { body } = req;
    const {
      email,
      password,
      name,
    } = body;
    const existinUser = await User.findOne({ email });
    if (existinUser) {
      const conflict = new ConflictError('User alredy exists');
      return next(conflict);
    }
    const hashedPassword = createHash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    try {
      const user = await newUser.save();
      res.status(201).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  },

  listUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
  },

  userMe: async (req, res, next) => {
    try {
      const { user } = req;
      const id = user._id;
      const userData = await User.findById(id);
      if (!userData) {
        const validationError = new ValidationError('User not found!');
        return next(validationError);
      }
      const { email, name, _id } = userData;
      return res.status(201).json({ email, name, _id });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findUserByCredentials(email, password);
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
      res.send({ token });
    } catch (error) {
      next(error);
    }
  },
};
