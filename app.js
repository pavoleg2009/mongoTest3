const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
  console.log('Connected to main db: mongodb://localhost/muber');
}

app.use(bodyParser.json()); // strictly above route
routes(app);

app.use((err, req, res, next) => {
  res.send({ error: err.message })
  //next();
});

module.exports = app
