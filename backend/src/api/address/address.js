const db = require('../index');
const sqlAddress = require('../../sql').address
const MESSAGE_OK = 'OK';

function getAllAddress(req, res, next) {
    db.any(sqlAddress.getAll)
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

function getSingleAddressById(req, res, next) {
    const id = {
        id: req.params.id
    };
    db.one(sqlAddress.getById, id)
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
            console.log(error);
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: error.message
                });
        });
}

function getSingleAddressByUserId(req, res, next) {
    const idUser = {
        id_user: req.params.id_user
    };
    db.one(sqlAddress.getByIdUser, idUser)
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
            console.log(error);
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: error.message
                });
        });
}

function postAddress(req, res, next) {
    const address = req.body.user_address;
    db.one(sqlAddress.add, address)
        .then(data => {
            res.status(200)
                .json({
                    status: 200,
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
    getAllAddress,
    getSingleAddressById,
    getSingleAddressByUserId,
    postAddress
};