const models = require('express').Router();
const db = require('../../api/MBTI/mbti')

models.get('/', db.getAllMBTI);
models.get('/:id', db.getSingleMBTIById);

module.exports = models;