const models = require('express').Router();
const db = require('../../api/user/user')

models.get('/', db.getAllUser);
models.post('/', db.postUser);


module.exports = models;