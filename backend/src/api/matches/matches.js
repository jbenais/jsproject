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
    console.log('Here');
    const userMatches = req.body.user_matches;
    const userOppositeMatch = {
        id_user: userMatches.id_user_love,
        id_user_love: userMatches.id_user
    };
    db.tx(t => {
            return t.oneOrNone(sqlMatches.getByIdUsers, userOppositeMatch)
                .then(data => {
                    if (data) {
                        console.log("Match");
                        const user = createMatchesJson(userMatches.id_user, userMatches.id_user_love, true);
                        const addQuery = t.one(sqlMatches.add, user);
                        const putQuery =  t.none(sqlMatches.update, {
                            is_matched: true,
                            id: data.id
                        });
                        return addQuery;
                    }
                    else{
                        console.log("No match");
                        const user = createMatchesJson(userMatches.id_user, userMatches.id_user_love, false);
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

function createMatchesJson(id_user, id_user_love, isMatched){
    return {
        id_user: id_user,
        id_user_love: id_user_love,
        is_matched: isMatched
    }
}
//#endregion


module.exports = {
    getAllMatches,
    getMatchesById,
    getMatchesByIdUser,
    postMatches
};