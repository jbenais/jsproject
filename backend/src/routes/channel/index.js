const models = require('express').Router();
const db = require('../../api/channel/channel')

models.get('/', db.getAllChannel);
models.get('/user_one/:id_user_one/user_two/:id_user_two', db.getChannelByIdUsers);
models.post('/', db.postChannel);

module.exports = models;