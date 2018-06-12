const db = require('../index');
const TABLE_NAME = 't_user';
const MESSAGE_OK = 'OK';
const sqlUser = require('../../sql').users;
const sqlAddress = require('../../sql').address;

function getAllUser(req, res, next) {
    db.any(sqlUser.getAll)
        .then(function (data) {
            const status = 200
            res.status(200)
                .json({
                    status: 200,
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

function postUser(req, res, next) {
    const user = req.body.user_general;
    db.one(sqlUser.add, user)
        .then(data => {
            const status = 200;
            res.status(status)
                .json({
                    status: status,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(error => {
            const status = 403;
            res.status(403)
                .json({
                    status: 403,
                    data: { error },
                    message: error.message
                });
        });
}

module.exports = {
    getAllUser,
    postUser
};