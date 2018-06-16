const models = require('express').Router();
const db = require('../../api/notification/notification')

models.get('/', db.getAllNotification);
models.get('/channel/:id_channel/user/:id_user', db.getNotificationByUserChannel);
models.post('/', db.postNotification);
models.put('/channel/:id_channel/user/:id_user', db.putNotification);

module.exports = models;