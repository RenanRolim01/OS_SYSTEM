const OS = require('../models/OS');
const fs = require('fs');
const path = require('path');

const createOS = async (req, res) => {
  const { description, checklist } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  if (!description || !checklist) {
    return res.status(400).json({ message: 'Descrição e checklist são obrigatórios' });
  }

  const os = new OS({
    description,
    checklist: JSON.parse(checklist),
    photo,
    user: req.user.id,
  });

  await os.save();
  res.status(201).json(os);
};

const getOS = async (req, res) => {
  const osList = await OS.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(osList);
};

module.exports = { createOS, getOS };