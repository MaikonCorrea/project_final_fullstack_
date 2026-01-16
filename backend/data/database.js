const mongoose = require('mongoose');

// Transformamos em função assíncrona para usar await
module.exports = async function connectDatabase() {
  try {
    await mongoose.connect(`mongodb+srv://maikonacorrea:${process.env.PASSWORD_MONGODB}@cluster0.dsxeka9.mongodb.net/newsexplorer?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('✅ Database Connected Successfully!');
  } catch (err) {
    console.error('❌ Database Connection Failed:', err.message);
    // Encerra o processo se o banco não conectar, pois a API não serve sem banco
    process.exit(1);
  }
};