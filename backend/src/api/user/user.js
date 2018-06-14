const db = require('../index');
const { google } = require('googleapis');
const FB = require('fb').default;
const MESSAGE_OK = 'OK';
const sqlUser = require('../../sql').users;
const sqlAddress = require('../../sql').address;
const sqlPicture = require('../../sql').userPicture;
const sqlUserPreference = require('../../sql').userPreferences;
const sqlUserTarget = require('../../sql').userTarget;

function getAllUser(req, res, next) {
    db.any(sqlUser.getAll)
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

function getUserInfo(req, res, next) {
    const id = req.params.id;
    db.tx(t => {
        return t.oneOrNone(sqlUser.getById, { id: id })
            .then(data => {
                if (data) {
                    const address = t.oneOrNone(sqlAddress.getByIdUser, { id_user: data.id });
                    const picture = t.any(sqlPicture.getByIdUser, { id_user: data.id });
                    const preference = t.any(sqlUserPreference.getByIdUser, { id_user: data.id });
                    const target = t.any(sqlUserTarget.getByIdUser, { id_user: data.id });
                    return t.batch([data, picture, address, preference, target]);
                }
            });
    }).then(result => {
        console.log("Get info");

        const status = 200
        const data = {
            user_general: result[0],
            user_picture: result[1],
            user_address: result[2],
            user_preference: result[3],
            user_target: result[4]
        }
        res.status(status)
            .json({
                status: status,
                data: data,
                message: MESSAGE_OK
            });
    }).catch(function (error) {
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

function postUser(req, res, next) {

    const is_google = req.body.is_google;
    if (!is_google) {
        const accessToken = req.body.data.access_token;
        FB.api('me', { fields: ['email', 'first_name', 'last_name', 'birthday', 'picture'], access_token: accessToken },
            (result) => {
                const user_general = {
                    'email': result.email,
                    'firstname': result.first_name,
                    'lastname': result.last_name
                }
                const url = result.picture.data.url;
                postUserInfo(res, user_general, url);
            })
    }
    else {
        const userId = req.body.data.access_token;
        const plus = google.plus({
            version: 'v1',
            auth: 'AIzaSyDPgGF_QN1xOijSLG6WICVL5kI87YP7Hs0'
        });
        plus.people.get({ userId: userId })
            .then((result) => {
                const user_general = {
                    'email': req.body.data.email,
                    'firstname': result.data.name.givenName,
                    'lastname': result.data.name.familyName
                }
                const url = result.data.image.url;
                postUserInfo(res, user_general, url);
            })
    }
}

function postUserInfo(res, user_general, url) {
    const email = user_general.email;
    db.tx(t => {
        return t.oneOrNone(sqlUser.getByEmail, { email: email })
            .then(data => {
                if (data) {
                    const address = t.oneOrNone(sqlAddress.getByIdUser, { id_user: data.id });
                    const picture = t.any(sqlPicture.getByIdUser, { id_user: data.id });
                    const preference = t.any(sqlUserPreference.getByIdUser, { id_user: data.id });
                    const target = t.any(sqlUserTarget.getByIdUser, { id_user: data.id });
                    return t.batch([data, picture, address, preference, target]);
                }
                else {
                    return t.one(sqlUser.add, user_general).then(
                        user => {
                            const user_picture = {
                                id_user: user.id,
                                url: url,
                                is_profile: true
                            }
                            const picture = t.any(sqlPicture.add, user_picture)
                            console.log("Created new user");
                            return t.batch([user, picture, null, [], []])
                        }
                    )
                }
            });
    }).then(result => {
        const status = 200
        const data = {
            user_general: result[0],
            user_picture: result[1],
            user_address: result[2],
            user_preference: result[3],
            user_target: result[4]
        }
        res.status(status)
            .json({
                status: status,
                data: data,
                message: MESSAGE_OK
            });
    }).catch(function (error) {
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

function putUser(req, res, next) {
    const id = req.params.id
    db.tx(t => {
        var queries = [];
        const user_general = req.body.user_general;
        const user_preference_new = req.body.user_preferences;
        const user_address = req.body.user_address;
        const user_target_new = req.body.user_target;

        queries.push(putUserGeneral(user_general, id));
        if (user_address != null)
            queries.push(putUserAddress(user_address, id));
        queries.push(putUserPreferences(user_preference_new, id));
        queries.push(putUserTarget(user_target_new, id));
        return t.batch(queries);
    }).then(() => {
        getUserInfo(req, res, next);
    }).catch(function (error) {
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

function putUserGeneral(user_general, id) {
    return db.oneOrNone(sqlUser.update, user_general)
        .then(() => {
            console.log("Updated: putUserGeneral")
        }).catch(function (error) {
            console.log("Erreur: putUserGeneral")
        });
}

function putUserAddress(user_address, id) {
    return db.tx(t => {
        return t.oneOrNone(sqlAddress.getByIdUser, { id_user: id })
            .then(data => {
                if (data != null) {
                    const address = t.oneOrNone(sqlAddress.update, user_address);
                    return t.batch([address]);
                }
                else {
                    const address = t.oneOrNone(sqlAddress.add, user_address);
                    return t.batch([address]);
                }
            });
    })
        .then(() => {
            console.log("Updated: putUserAddress")
        }).catch(function (error) {
            console.log("Erreur: putUserAddress")
        });
}


function putUserPreferences(user_preference_new, id) {
    return db.tx(t => {
        return t.any(sqlUserPreference.getByIdUser, { id_user: id })
            .then(user_preference_base => {
                var queries = [];
                user_preference_new.forEach(n => {
                    const index = user_preference_base.findIndex(b => b.id_user == n.id_user && b.id_mbti == n.id_mbti)
                    if (index == -1)
                        queries.push(t.oneOrNone(sqlUserPreference.add, n));
                    else
                        user_preference_base.splice(index, 1);
                });
                user_preference_base.forEach(b => {
                    queries.push(t.none(sqlUserPreference.delete, b))
                })
                return t.batch(queries);
            })
    }).then(() => {
        console.log("Updated: putUserPreferences")
    }).catch(function (error) {
        console.log("Erreur: putUserPreferences")
    });
}

function putUserTarget(user_target_new, id) {
    return db.tx(t => {
        return t.any(sqlUserTarget.getByIdUser, { id_user: id })
            .then(user_target_base => {
                var queries = [];
                user_target_new.forEach(n => {
                    const index = user_target_base.findIndex(b => b.id_user == n.id_user && b.id_target == n.id_target)
                    if (index == -1)
                        queries.push(t.oneOrNone(sqlUserTarget.add, n));
                    else
                        user_target_base.splice(index, 1);
                });
                user_target_base.forEach(b => {
                    queries.push(t.none(sqlUserTarget.delete, b))
                })
                return t.batch(queries);
            })
    }).then(() => {
        console.log("Updated: putUserTarget")
    }).catch(function (error) {
        console.log("Erreur: putUserTarget")
    });

}

module.exports = {
    getAllUser,
    postUser,
    putUser
};