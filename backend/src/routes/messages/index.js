const models = require('express').Router();
const db = require('../../api/messages/messages')

models.get('/', db.getAllMessages);
models.get('/channel/:id_channel/date/:before_date', db.getMessageBeforeDate);
models.post('/', db.postMessage);

module.exports = models;