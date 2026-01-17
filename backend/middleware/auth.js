const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new UnauthorizedError('Authorization required!');
    return next(unauthorizedError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
    if (payload === null) {
      const unauthorizedError = new UnauthorizedError('Payload null');
      return next(unauthorizedError);
    }
  } catch (error) {
    const unauthorizedError = new UnauthorizedError('Invalid token!');
    return next(unauthorizedError);
  }

  req.user = payload;
  next();
};
