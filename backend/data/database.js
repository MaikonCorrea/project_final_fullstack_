const mongoose = require('mongoose');

let isConnected = false;

module.exports = async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
      throw new Error('A variável MONGODB_URI não está definida no arquivo .env');
    }

    await mongoose.connect(dbUri);

    isConnected = true;
    console.log('✅ MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};
