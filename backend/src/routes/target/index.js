const models = require('express').Router();
const db = require('../../api/target/target')

models.get('/', db.getAllTarget);
models.get('/:id', db.getSingleTargetById);

module.exports = models;