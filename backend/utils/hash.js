const bcrypt = require('bcryptjs');

module.exports = {
  createHash: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  validateHash: (passwordHash) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordHash, salt);
    bcrypt.compareSync(passwordHash, hash);
  },
};
