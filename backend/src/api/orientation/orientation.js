const db = require('../index');
const sqlOrientation = require('../../sql').orientation;
const MESSAGE_OK = 'OK';

function getAllOrientation(req, res, next) {
    db.any(sqlOrientation.getAll)
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

function getSingleOrientationById(req, res, next) {
    const id = {
        id: req.params.id
    }
    db.one(sqlOrientation.getById, id)
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

module.exports = {
    getAllOrientation,
    getSingleOrientationById
};