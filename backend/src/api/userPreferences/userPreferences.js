const db = require('../index');
const MESSAGE_OK = 'OK';
const sqlUserPreferences = require('../../sql').userPreferences;

//#region GET

function getAllUserPreferences(req, res, next) {
    db.any(sqlUserPreferences.getAll)
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

function getUserPreferencesById(req, res, next) {
    const id = {
        id: req.params.id
    }
    db.one(sqlUserPreferences.getById, id)
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

function getUserPreferencesByIdUser(req, res, next) {
    const id_user = {
        id_user: req.params.id_user
    }
    db.any(sqlUserPreferences.getByIdUser, id_user)
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

function getUserPreferencesByIdMBTI(req, res, next) {
    const id_mbti = {
        id_mbti: req.params.id_mbti
    }
    db.any(sqlUserPreferences.getByIdMBTI, id_mbti)
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

function postUserPreferences(req, res, next) {
    const userPreferences = req.body.user_preferences;
    db.one(sqlUserPreferences.add, userPreferences)
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
    getAllUserPreferences,
    getUserPreferencesById,
    getUserPreferencesByIdUser,
    getUserPreferencesByIdMBTI,
    postUserPreferences
};