const db = require('../index');
const sqlMessages = require('../../sql').messages
const MESSAGE_OK = 'OK';

function getAllMessages(req, res, next) {
    db.any(sqlMessages.getAll)
        .then(function (data) {
            const status = 200
            res.status(status)
                .json({
                    status: status,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(function (error) {
            const status = 403
            console.log(error);
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: error.message
                });
        });
}

function getMessageBeforeDate(req, res, next) {
    const message = {
        id_channel: req.params.id_channel,
        before_date: req.params.before_date
    };
    db.any(sqlMessages.getMessageBeforeDate, message)
        .then(function (data) {
            const status = 200
            res.status(status)
                .json({
                    status: status,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(function (error) {
            const status = 403;
            console.log(error);
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: error.message
                });
        });
}

function postMessage(req, res, next) {
    const message = req.body.message;
    db.one(sqlMessages.add, message)
        .then(data => {
            const status = 200
            res.status(status)
                .json({
                    status: status,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 400,
                    data: {error},
                    message: error.message
                });
        });
}

module.exports = {
    getAllMessages,
    getMessageBeforeDate,
    postMessage
};