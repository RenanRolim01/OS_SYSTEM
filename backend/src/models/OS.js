const mongoose = require('mongoose');

const osSchema = new mongoose.Schema({
  description: { type: String, required: true },
  checklist: [{ item: String, checked: Boolean }],
  photo: { type: String }, // URL ou base64 da foto
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OS', osSchema);