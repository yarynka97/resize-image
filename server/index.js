const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const resizeImage = require('./resizeImage');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/resize', resizeImage);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

module.exports = app;
