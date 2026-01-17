class UnauthorizedError extends Error { // <--- Use Error nativo, não require('mongoose').Error
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
