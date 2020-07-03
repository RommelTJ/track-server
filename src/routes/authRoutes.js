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

module.exports = router;
