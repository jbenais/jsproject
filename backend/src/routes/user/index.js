const models = require('express').Router();
const db = require('../../api/user/user')

models.get('/', db.getAllUser);
models.get('/:id/users', db.getPossibleByIdUser);
models.post('/', db.postUser);
models.put('/:id', db.putUser);

module.exports = models;