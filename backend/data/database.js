const mongoose = require('mongoose');

module.exports = function connectDatabase() {
  mongoose.connect(`mongodb+srv://maikonacorrea:${process.env.PASSWORD_MONGODB}@cluster0.dsxeka9.mongodb.net/newsexplorer?retryWrites=true&w=majority`);

  console.log('Database Conected!');
};
