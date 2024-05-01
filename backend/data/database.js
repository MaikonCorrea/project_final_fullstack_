const mongoose = require('mongoose');

module.exports = function connectDatabase() {
  mongoose.connect('mongodb://127.0.0.1:27017/newsexplorer');
  console.log('Database Conected!');
};
