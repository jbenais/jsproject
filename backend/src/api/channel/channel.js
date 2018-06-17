const uuidv4 = require('uuid/v4');
const db = require('../index');
const sqlChannel = require('../../sql').channel
const MESSAGE_OK = 'OK';

function getAllChannel(req, res, next) {
    db.any(sqlChannel.getAll)
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

function getChannelByIdUsers(req, res, next) {
    const channel = {
        id_user_one: req.params.id_user_one,
        id_user_two: req.params.id_user_two
    };
    db.one(sqlChannel.getByIdUsers, channel)
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
            const status = 404;
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: error.message
                });
        });
}

function postChannel(req, res, next) {
    const channel = req.body.channel;
    channel.uuid = uuidv4();
    db.one(sqlChannel.add, channel)
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
    getAllChannel,
    getChannelByIdUsers,
    postChannel
};