const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail'); // Caminho corrigido para ser mais robusto
const UnauthorizedError = require('../errors/UnauthorizedError'); // <--- 1. IMPORTANTE: Faltava importar

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Email format is invalid!',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'The name must have at least 2 characters'],
      maxlength: [30, 'The name cannot be longer than 30 characters'],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Incorrect Email or Password!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // 3. MESMA COISA AQUI
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Incorrect Email or Password!'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
