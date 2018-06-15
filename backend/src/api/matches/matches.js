const db = require('../index');
const MESSAGE_OK = 'OK';
const sqlMatches = require('../../sql').matches;

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
    console.log(is_liked);
    const userOppositeMatch = {
        id_user: id_opposite_user,
        id_opposite_user: id_user
    };
    db.tx(t => {
        return t.oneOrNone(sqlMatches.getByIdUsers, userOppositeMatch)
            .then(data => {
                if (data) {
                    const is_matched = is_liked && data.is_liked;
                    const user = createMatchesJson(id_user, id_opposite_user, is_matched, is_liked);
                    if (is_matched){
                        console.log("Match !");
                        t.none(sqlMatches.update, { is_matched: true, id: data.id });
                    }
                    return t.one(sqlMatches.add, user);;
                }
                else {
                    console.log("No match");
                    const user = createMatchesJson(id_user, id_opposite_user, false, is_liked);
                    return t.one(sqlMatches.add, user);
                }
            });
    })
        .then(data => {
            const status = 200
            res.status(status)
                .json({
                    status: status,
                    data: data,
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

function createMatchesJson(idUser, idOppositeUser, isMatched, isLiked) {
    return {
        id_user: idUser,
        id_opposite_user: idOppositeUser,
        is_matched: isMatched,
        is_liked: isLiked
    }
}
//#endregion


module.exports = {
    getAllMatches,
    getMatchesById,
    getMatchesByIdUser,
    postMatches
};