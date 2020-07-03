const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jsonSecretKey = require('../../env');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jsonSecretKey);
    res.send({ token });
  } catch (e) {
    return res.status(422).send('Something went wrong: ' + e.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(422).send({error: "Must provide email and password."});
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({error: "Email not found."});
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jsonSecretKey);
    res.send({ token });
  } catch (e) {
    return res.status(422).send({ error: 'Something went wrong: ' + e.message});
  }
});

module.exports = router;
