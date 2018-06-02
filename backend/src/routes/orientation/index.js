const models = require('express').Router();
const db = require('../../api/orientation/orientation')

models.get('/', db.getAllOrientation);
models.get('/:id', db.getSingleOrientationById);

module.exports = models;