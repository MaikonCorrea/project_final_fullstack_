const mongoose = require('mongoose');

// Variável para controlar o estado da conexão (importante para serverless/vercel futuramente)
let isConnected = false;

module.exports = async function connectDatabase() {
  // Se já estiver conectado, reutiliza a conexão existente
  if (isConnected) {
    return;
  }

  try {
    // Pega a string completa do arquivo .env
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
      throw new Error('A variável MONGODB_URI não está definida no arquivo .env');
    }

    // Conecta ao banco
    await mongoose.connect(dbUri);

    isConnected = true;
    console.log('✅ MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    // Encerra o app se não conseguir conectar na inicialização local
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};
