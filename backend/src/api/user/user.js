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

// function postUser(req, res, next) {
//     const accessToken = req.body.access_token;
//     const is_google = req.body.is_google;
//     console.log(accessToken);


//     plus.people.get({ userId: accessToken })
//         .then(data => {
//             // const user_general = {
//             //     "email": "delphine.au@g",
//             //     "firstname": "Mickael",
//             //     "lastname": "Au",
//             //     "age": 21,
//             //     "is_male": true
//             // }
//             console.log(data);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

// function postUser(req, res, next) {
//     const accessToken = req.body.access_token;
//     const is_google = req.body.is_google;
//     console.log(accessToken);
//     res.status(200)
//         .json({
//             status: 200,
//             data: "",
//             message: MESSAGE_OK
//         });
// }
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
        return t.oneOrNone(sqlUser.getByEmail, {email: email})
            .then(data => {
                if (data) {
                    console.log(data);
                    return data;
                    // const user_address = t.any(sqlAddress.getByIdUser, {id_user: data.id});
                    // const user_picture = t.any(sqlPicture.getByIdUser, {id_user: data.id});
                    // const user_preference = t.any(sqlUserPreference.getByIdUser, {id_user: data.id});
                    // const user_target = t.any(sqlUserTarget.getByIdUser, {id_user: data.id});
                    // const myData = {
                    //     user_general: data,
                    //     user_picture: user_picture,
                    //     user_address: user_address,
                    //     user_preference: user_preference,
                    //     user_target: user_target  
                    // };
                    // console.log(myData);
                    // return myData;
                }
                else{
                    console.log(data);
                    db.one(sqlUser.add, user_general)
                    .then(data => {
                        console.log(data.id);
                        postUserProfilePicture(res, data.id, url);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400)
                            .json({
                                status: 400,
                                data: { error },
                                message: error.message
                            });
                    });
                }
            });
    })

}


function postUserProfilePicture(res, id_user, url) {
    const user_picture = {
        id_user: id_user,
        url: url,
        is_profile: true
    }
    db.one(sqlPicture.add, user_picture)
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
            console.log(error);
            res.status(400)
                .json({
                    status: 400,
                    data: { error },
                    message: error.message
                });
        });
}
module.exports = {
    getAllUser,
    postUser
};