const db = require('../index');
const MESSAGE_OK = 'OK';
const MESSAGE_ERROR = 'An error occured';
const MESSAGE_NOT_FOUND = 'No data has been found';

function getAllMBTI(req, res, next) {
    db.any(`SELECT * FROM t_mbti`)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 200,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(function (error) {
            console.log(MESSAGE_ERROR)
        });
}

function getSingleMBTIById(req, res, next) {
    const id = req.params.id;
    db.one('SELECT * FROM t_mbti WHERE id = $1', [id])
        .then(function (data) {
            res.status(200)
                .json({
                    status: 200,
                    data: data,
                    message: MESSAGE_OK
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(200)
                .json({
                    status: 403,
                    data: {},
                    message: MESSAGE_NOT_FOUND
                });
        });
}



module.exports = {
    getAllMBTI,
    getSingleMBTIById
};