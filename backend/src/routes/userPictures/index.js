const models = require('express').Router();
const db = require('../../api/userPictures/userPictures')

models.post('/', db.postUserPicture);

module.exports = models;