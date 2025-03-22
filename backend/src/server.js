const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/osRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Usa o MONGODB_URI do ambiente diretamente
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/os-system';
console.log('MONGODB_URI do ambiente:', process.env.MONGODB_URI);
console.log('Valor de mongoURI usado:', mongoURI);

// Chama a função de conexão
connectDB(mongoURI);

app.use('/api/auth', authRoutes);
app.use('/api/os', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));