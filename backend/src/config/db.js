const mongoose = require('mongoose');

const connectDB = (mongoURI) => {
  console.log('Conectando ao MongoDB com URI:', mongoURI);
  mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000, // Timeout de 30s
  })
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));
};

module.exports = connectDB;