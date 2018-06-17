const uuidv4 = require('uuid/v4');
const db = require('../index');
const MESSAGE_OK = 'OK';
const sqlMatches = require('../../sql').matches;
const sqlChannel = require('../../sql').channel;
const sqlNotification = require('../../sql').notification;

//#region GET

function getAllMatches(req, res, next) {
    db.any(sqlMatches.getAll)
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

function getMatchesById(req, res, next) {
    const id = {
        id: req.params.id
    }
    db.one(sqlMatches.getById, id)
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

function getMatchesByIdUser(req, res, next) {
    const id_user = {
        id_user: req.params.id_user
    }
    db.any(sqlMatches.getByIdUser, id_user)
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

function postMatches(req, res, next) {
    const { id_user, id_opposite_user, is_liked } = req.body.user_matches;
    const userOppositeMatch = {
        id_user: id_opposite_user,
        id_opposite_user: id_user
    };
    db.tx(t => {
        return t.oneOrNone(sqlMatches.getByIdUsers, userOppositeMatch)
            .then(data => {
                if (data) {
                    let queries = [];
                    const is_matched = is_liked && data.is_liked;
                    const user = createMatchesJson(id_user, id_opposite_user, is_matched, is_liked);
                    if (is_matched){
                        console.log("Match !");
                        queries.push(t.any(sqlMatches.update, { is_matched: true, id: data.id }));
                        queries.push(createMessageService(id_user, id_opposite_user));
                        queries.push(t.one(sqlMatches.add, user));
                    }
                    else
                        queries.push(t.one(sqlMatches.add, user));
                    return t.batch(queries);
                }
                else {
                    console.log("No match");
                    const user = createMatchesJson(id_user, id_opposite_user, false, is_liked);
                    return t.one(sqlMatches.add, user);
                }
            });
    })
        .then(() => {
            const status = 200
            res.status(status)
                .json({
                    status: status,
                    data: {},
                    message: MESSAGE_OK
                });
        })
        .catch(error => {
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

function createMessageService(id_user, id_opposite_user){
    const channel = { "id_user_one": id_user, "id_user_two": id_opposite_user };
    channel.uuid = uuidv4();
    return db.tx(t => {
        return t.one(sqlChannel.add, channel)
            .then(data => {
                const notificationOne = createNotificationJson(id_user, data.id);
                const notificationTwo = createNotificationJson(id_opposite_user, data.id);
                const queryOne = t.oneOrNone(sqlNotification.add, notificationOne);
                const queryTwo = t.oneOrNone(sqlNotification.add, notificationTwo);
                return t.batch([queryOne, queryTwo])
            });
    })
        .then(() => {
            console.log("Created messaging service !");
        })
        .catch(error => {
            console.log("Erreur: createMessageService")
        });
}

function createMatchesJson(idUser, idOppositeUser, isMatched, isLiked) {
    return {
        id_user: idUser,
        id_opposite_user: idOppositeUser,
        is_matched: isMatched,
        is_liked: isLiked
    };
}

function createNotificationJson(idUser, idChannel){
    return {
        id_user: idUser,
        id_channel: idChannel
    };
}
//#endregion


module.exports = {
    getAllMatches,
    getMatchesById,
    getMatchesByIdUser,
    postMatches
};