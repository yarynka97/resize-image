const express = require('express');
const cors = require('cors');

const resizeImage = require('./resizeImage');

const app = express();

app.use(cors({ origin: '*' }));

app.use('/resize', resizeImage);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  next();
});

module.exports = app;
