const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongoUri = 'mongodb+srv://rommel:REDACTED@cluster0-bjpcs.mongodb.net/dev?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance!');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('hi there');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
