const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Validações
  if (!username || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  const user = await User.findOne({ username });
  if (!user || !(password === user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
};

module.exports = { login };