const db = require('../index');
const sqlNotification = require('../../sql').notification
const MESSAGE_OK = 'OK';

function getAllNotification(req, res, next) {
    db.any(sqlNotification.getAll)
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

function getNotificationByUserChannel(req, res, next) {
    const notification = {
        id_user: req.params.id_user,
        id_channel: req.params.id_channel
    };
    db.any(sqlNotification.getByIdUserChannel, notification)
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

function postNotification(req, res, next) {
    const notification = req.body.notification;
    db.one(sqlNotification.add, notification)
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
            const status = 403;
            res.status(status)
                .json({
                    status: status,
                    data: {error},
                    message: error.message
                });
        });
}

function putNotification(req, res, next) {
    const notification = {
        id_user: req.params.id_user,
        id_channel: req.params.id_channel,
        is_read: req.body.notification.is_read
    };
    db.one(sqlNotification.update, notification)
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
            const status = 403;
            res.status(status)
                .json({
                    status: status,
                    data: {error},
                    message: error.message
                });
        });
}


module.exports = {
    getAllNotification,
    getNotificationByUserChannel,
    postNotification,
    putNotification
};