const models = require('express').Router();
const db = require('../../api/matches/matches')

models.get('/', db.getAllMatches);
models.get('/:id', db.getMatchesById);
models.get('/user/:id_user', db.getMatchesByIdUser);
models.post('/', db.postMatches);

module.exports = models;