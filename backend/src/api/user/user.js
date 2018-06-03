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
    const address = req.body.user_address;
    db.one(sqlUser.add, user)
        .then(user_general => {
            postAddress(res, user_general, address.latitude, address.longitude)
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 400,
                    data: { error },
                    message: error.message
                });
        });
}

function postAddress(res, user_general, latitude, longitude) {
    const address = {
        id_user: user_general.id,
        latitude: latitude,
        longitude: longitude
    }
    db.one(sqlAddress.add, address)
        .then(data => {
            res.status(200)
                .json({
                    status: 200,
                    data: {
                        user_general: user_general,
                        user_address: data
                    },
                    message: MESSAGE_OK
                });
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 400,
                    data: { error },
                    message: error.message
                });
        });
}



module.exports = {
    getAllUser,
    postUser
};