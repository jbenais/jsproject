const models = require('express').Router();
const db = require('../../api/userPreferences/userPreferences')

models.get('/', db.getAllUserPreferences);
models.get('/:id', db.getUserPreferencesById);
models.get('/user/:id_user', db.getUserPreferencesByIdUser);
models.get('/mbti/:id_mbti', db.getUserPreferencesByIdMBTI);
models.post('/', db.postUserPreferences);

module.exports = models;