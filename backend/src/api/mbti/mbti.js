const db = require('../index');
const sqlMBTI = require('../../sql').mbti;

const MESSAGE_OK = 'OK';

function getAllMBTI(req, res, next) {
    db.any(sqlMBTI.getAll)
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

function getSingleMBTIById(req, res, next) {
    const id = {
        id: req.params.id
    }
    db.one(sqlMBTI.getById, id)
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
    getAllMBTI,
    getSingleMBTIById,
};