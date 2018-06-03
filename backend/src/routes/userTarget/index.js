const models = require('express').Router();
const db = require('../../api/userTarget/userTarget')

models.get('/', db.getAllUserTarget);
models.get('/:id', db.getUserTargetById);
models.get('/user/:id_user', db.getUserTargetByIdUser);
models.get('/target/:id_target', db.getUserTargetByIdTarget);
models.post('/', db.postUserTarget);

module.exports = models;