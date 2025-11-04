const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  emoji: String,
  calories: Number,
  spunAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);