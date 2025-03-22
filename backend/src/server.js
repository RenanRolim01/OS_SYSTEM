// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/osRoutes');

// Carrega o .env e loga o caminho
const envPath = path.resolve(__dirname, '../.env');
console.log('Caminho do .env:', envPath);
dotenv.config({ path: envPath });

// Verifica se MONGO_URI foi carregado
console.log('MONGO_URI após dotenv:', process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

// Chama a função de conexão
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/os-system');

app.use('/api/auth', authRoutes);
app.use('/api/os', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));