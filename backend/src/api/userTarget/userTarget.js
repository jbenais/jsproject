const db = require('../index');
const MESSAGE_OK = 'OK';
const sqlUserTarget = require('../../sql').userTarget;

//#region GET

function getAllUserTarget(req, res, next) {
    db.any(sqlUserTarget.getAll)
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

function getUserTargetById(req, res, next) {
    const id = {
        id: req.params.id
    }
    db.one(sqlUserTarget.getById, id)
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

function getUserTargetByIdUser(req, res, next) {
    const id_user = {
        id_user: req.params.id_user
    }
    db.any(sqlUserTarget.getByIdUser, id_user)
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

function getUserTargetByIdTarget(req, res, next) {
    const id_target = {
        id_target: req.params.id_target
    }
    db.any(sqlUserTarget.getByIdTarget, id_target)
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

//#endregion

//#region POST

function postUserTarget(req, res, next) {
    const userTarget = req.body.user_target;
    db.one(sqlUserTarget.add, userTarget)
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

//#endregion


module.exports = {
    getAllUserTarget,
    getUserTargetById,
    getUserTargetByIdUser,
    getUserTargetByIdTarget,
    postUserTarget
};