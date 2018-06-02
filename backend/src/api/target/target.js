const db = require('../index');
const TABLE_NAME =  't_target';
const MESSAGE_OK = 'OK';

function getAllTarget(req, res, next) {
    db.any(`SELECT * FROM ${TABLE_NAME}`)
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

function getSingleTargetById(req, res, next) {
    const id = req.params.id;
    db.one(`SELECT * FROM ${TABLE_NAME} WHERE id = ${id}`)
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
    getAllTarget,
    getSingleTargetById
};