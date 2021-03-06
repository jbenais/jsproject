const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const app = express();
const routes = require('./routes/index');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', routes)

app.use(function(req, res, next) {
  var err = new Error('Votre page est introuvable');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status)
  .json({
    status: err.status,
    data: {},
    message: err.message
  });
});

module.exports = app