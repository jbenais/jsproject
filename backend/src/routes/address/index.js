const models = require('express').Router();
const db = require('../../api/address/address')

models.get('/', db.getAllAddress);
models.get('/:id', db.getSingleAddressById);
models.get('/user/:id_user', db.getSingleAddressByUserId);
models.post('/', db.postAddress);

module.exports = models;