const db = require('../index');
const { google } = require('googleapis');
const FB = require('fb').default;
const geolib = require('geolib');
const sqlUser = require('../../sql').users;
const sqlAddress = require('../../sql').address;
const sqlPicture = require('../../sql').userPicture;
const sqlUserPreference = require('../../sql').userPreferences;
const sqlUserTarget = require('../../sql').userTarget;

const MESSAGE_OK = 'OK';

//#region GET
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

function getUserById(req, res, next) {
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

function getPossibleByIdUser(req, res, next) {
    const id = req.params.id;
    db.tx(t => {
        return t.oneOrNone(sqlUser.getById, { id: id })
            .then(data => {
                if (data) {
                    const address = t.oneOrNone(sqlAddress.getByIdUser, { id_user: data.id });
                    const preference = t.any(sqlUserPreference.getByIdUser, { id_user: data.id });
                    const target = t.any(sqlUserTarget.getByIdUser, { id_user: data.id });
                    return t.batch([data, address, preference, target]);
                }
            });
    }).then(data => {
        const user = {
            user_general: data[0],
            user_address: data[1],
            user_preference: data[2],
            user_target: data[3]
        }
        filter(res, user);
    }).catch(function (error) {
        console.log("Erreur: getPossibleByIdUser")
    });
}

// Filter by age and sexual orientation
function filter(res, user) {
    const { user_general } = user;
    // Check if user is bisexual
    const queryFile = user_general.id_orientation == 3 ? sqlUser.getBiPossibleByIdUser : sqlUser.getMonoPossibleByIdUser;
    const queryObject = user_general.id_orientation == 3 ? createBiObject(user_general) : createMonoObject(user_general);
    db.any(queryFile, queryObject)
        .then(function (possibleUsers) {
            possibleUsers = possibleUsers.map(x => {return {user_general: x}})
            filterTarget(res, user, possibleUsers).then(possibleUsers => {
                filterMBTI(res, user, possibleUsers).then(possibleUsers => {
                    filterDistance(res, user, possibleUsers).then(possibleUsers => {
                        const status = 200;
                        res.status(status)
                            .json({
                                status: status,
                                data: possibleUsers,
                                message: MESSAGE_OK
                            });
                    });
                });
            });
        })
        .catch(function (error) {
            console.log("Erreur: filter");
        });
}

// Can be optimized
function filterTarget(res, user, possibleUsers) {
    const { user_general, user_address, user_preference, user_target } = user;
    return db.tx(t => {
        const queries = [];
        possibleUsers.forEach((u) => {
            const query = t.any(sqlUserTarget.getByIdUser, { id_user: u.user_general.id });
            queries.push(query);
        })
        return t.batch(queries);
    }).then(data => {
        for (i = 0; i < possibleUsers.length; i++)
            possibleUsers[i].user_target = data[i];
        if (!user_target.length)
            return possibleUsers;
        return possibleUsers.filter(x => x.user_target.length == 0 || containsTarget(user_target, x.user_target))
    }
    ).catch(function (error) {
        console.log("Erreur: filterTarget")
    });
}

//Can be optimized
function containsTarget(user_target, opposite_user_target) {
    let contains = false;
    user_target.forEach(target => {
        const condition = opposite_user_target.some(e => e.id_target === target.id_target);
        if (condition == true)
            contains = true;
    });
    return contains;
}

function filterMBTI(res, user, possibleUsers) {
    const { user_general, user_address, user_preference, user_target } = user;
    return db.tx(t => {
        const queries = [];
        possibleUsers.forEach((u) => {
            const query = t.any(sqlUserPreference.getByIdUser, { id_user: u.user_general.id });
            queries.push(query);
        })
        return t.batch(queries);
    }).then(data => {
        for (i = 0; i < possibleUsers.length; i++)
            possibleUsers[i].user_preference = data[i];
        if (user_preference.length == 0)
            return possibleUsers;
        return possibleUsers.filter(x =>
            isUserPreference(user_preference, x.user_general.id_mbti) &&
            (x.user_preference.length == 0 || isUserPreference(x.user_preference, user_general.id_mbti)))
    }
    ).catch(function (error) {
        console.log("Erreur: filterMBTI")
    });
}

function isUserPreference(user_preference, opposite_user_mbti) {
    for (i = 0; i < user_preference.length; i++) {
        const condition = user_preference.some(e => e.id_mbti === opposite_user_mbti);
        if (condition)
            return true;
    }
    return false;
}

function filterDistance(res, user, possibleUsers) {
    const { user_general, user_address, user_preference, user_target } = user;
    return db.tx(t => {
        const queries = [];
        possibleUsers.forEach((u) => {
            const query = t.any(sqlAddress.getByIdUser, { id_user: u.user_general.id });
            queries.push(query);
        })
        return t.batch(queries);
    }).then(data => {
        for (i = 0; i < possibleUsers.length; i++)
            possibleUsers[i].user_address = data[i];
        return possibleUsers.filter(x => 
            isDistanceCorrect(user_address, x.user_address[0], user_general.max_distance, x.user_general.max_distance)
        )
    }
    ).catch(function (error) {
        console.log(error);
        console.log("Erreur: filterDistance")
    });
}

function isDistanceCorrect(user_address, opposite_user_address, user_maxDistance, opposite_maxDistance) {
    const distance = computeDistance(user_address, opposite_user_address);
    const userMaxDistance = user_maxDistance * 1000;
    const oppositeUserMaxDistance = opposite_maxDistance * 1000;
    if (distance <= userMaxDistance && distance <= oppositeUserMaxDistance)
        return true;
    return false;
}

function computeDistance(user_address, opposite_user_address) {
    const origin = {
        latitude: user_address.latitude,
        longitude: user_address.longitude,
    };
    const destination = {
        latitude: opposite_user_address.latitude,
        longitude: opposite_user_address.longitude,
    };
    const distance = geolib.getDistanceSimple(
        origin,
        destination
    );
    return distance;
}

function createMonoObject(user_general) {
    const { id, is_male, id_orientation, age_max, age_min } = user_general
    const op_orientation_first = is_male ? 1 : 2;
    const op_orientation_second = 3;
    return {
        id: id,
        op_is_male: id_orientation == 1 ? true : false,
        op_orientation_first: op_orientation_first,
        op_orientation_second: op_orientation_second,
        op_birthdate_min: computeLimitYear(age_max),
        op_birthdate_max: computeLimitYear(age_min)
    }
}

function createBiObject(user_general) {
    const { id, is_male, age_max, age_min } = user_general
    const op_orientation_first = is_male ? 1 : 2;
    const op_orientation_second = 3;
    return {
        id: id,
        op_orientation_first: op_orientation_first,
        op_orientation_second: op_orientation_second,
        op_birthdate_min: computeLimitYear(age_max),
        op_birthdate_max: computeLimitYear(age_min)
    }
}

function computeLimitYear(nbYear) {
    let d = new Date();
    d.setFullYear(d.getFullYear() - nbYear);
    return d;
}
//#endregion

//#region POST
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
            }).catch(error => {
                console.log("Google error: " + error);
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
//#endregion

//#region PUT
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
        getUserById(req, res, next);
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
                    console.log(`Address login is : ${id}`);
                    const address = t.oneOrNone(sqlAddress.update, user_address);
                    return t.batch([address]);
                }
                else {
                    console.log(`Address login is : ${id}`);
                    const address = t.oneOrNone(sqlAddress.add, user_address);
                    return t.batch([address]);
                }
            });
    })
        .then(() => {
            console.log("Updated: putUserAddress")
        }).catch(function (error) {
            console.log(error);
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
//#endregion

module.exports = {
    getAllUser,
    getUserById,
    getPossibleByIdUser,
    postUser,
    putUser
};