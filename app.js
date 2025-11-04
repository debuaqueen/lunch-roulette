require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Menu = require('./models/Menu');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Home
app.get('/', async (req, res) => {
  const last = await Menu.find().sort({ spunAt: -1 }).limit(3);
  const usedIds = last.map(m => m._id);
  const choices = await Menu.find({ _id: { $nin: usedIds } });
  const today = choices.length ? choices[Math.floor(Math.random()*choices.length)] : last[0];
  res.render('index', { dish: today });
});

// Spin again
app.post('/spin', async (req, res) => {
  const last = await Menu.find().sort({ spunAt: -1 }).limit(3);
  const usedIds = last.map(m => m._id);
  const choices = await Menu.find({ _id: { $nin: usedIds } });
  const dish = choices[Math.floor(Math.random()*choices.length)];
  dish.spunAt = new Date();
  await dish.save();
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`Spin at http://localhost:${process.env.PORT}`);
});