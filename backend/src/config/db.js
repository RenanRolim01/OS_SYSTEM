// config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
    console.log('Valor de mongoURI recebido:', mongoURI);
    if (!mongoURI) {
      throw new Error('MONGO_URI não definido.');
    }

    console.log('Conectando ao MongoDB com URI:', mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;