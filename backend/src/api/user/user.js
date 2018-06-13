const db = require('../index');
const { google } = require('googleapis');
const FB = require('fb').default;
const MESSAGE_OK = 'OK';
const sqlUser = require('../../sql').users;
const sqlAddress = require('../../sql').address;
const sqlPicture = require('../../sql').userPicture;
const sqlUserPreference = require('../../sql').userPreferences;
const sqlUserTarget = require('../../sql').userTarget;

const plus = google.plus({
    version: 'v1',
    auth: 'AIzaSyDPgGF_QN1xOijSLG6WICVL5kI87YP7Hs0'
});

function getAllUser(req, res, next) {
    db.any(sqlUser.getAll)
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

function postUser(req, res, next) {

    const accessToken = req.body.access_token;
    const is_google = req.body.is_google;
    console.log("GOOGLE " + is_google);
    if (!is_google) {
        FB.api('me', { fields: ['email', 'first_name', 'last_name', 'birthday', 'picture'], access_token: accessToken },
            (result) => {
                const user_general = {
                    'email': result.email,
                    'firstname': result.first_name,
                    'lastname': result.last_name
                }
                const url = result.picture.data.url;
                postUserInfo(res, user_general, url)
            })
    }
    else {
        console.log(accessToken)
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
                    console.log("Get user");

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

module.exports = {
    getAllUser,
    postUser
};