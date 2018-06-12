const db = require('../index');
const { google } = require('googleapis');
const MESSAGE_OK = 'OK';
const sqlUser = require('../../sql').users;

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
//     const user = req.body.user_general;
//     db.one(sqlUser.add, user)
//         .then(data => {
//             const status = 200;
//             res.status(status)
//                 .json({
//                     status: status,
//                     data: data,
//                     message: MESSAGE_OK
//                 });
//         })
//         .catch(error => {
//             const status = 403;
//             res.status(403)
//                 .json({
//                     status: 403,
//                     data: { error },
//                     message: error.message
//main().catch(console.error);                 });
//         });
// }

function postUser(req, res, next) {
    const accessToken = req.body.access_token;
    const is_google = req.body.is_google;
    console.log(accessToken);
    res.status(200)
    .json({
        status: 200,
        data: "",
        message: MESSAGE_OK
    });;
    // const { google } = require('googleapis');
    // const plus = google.plus({
    //     version: 'v1',
    //     auth: accessToken // specify your API key here
    // });

    // async function main() {
    //     const res = await plus.people.get({ userId: 'me' });
    //     console.log(`Hello ${res.data.displayName}!`);
    // };
    // main().catch(console.error);
    // db.one(sqlUser.add, user)
    //     .then(data => {
    //         const status = 200;
    //         res.status(status)
    //             .json({
    //                 status: status,
    //                 data: data,
    //                 message: MESSAGE_OK
    //             });
    //     })
    //     .catch(error => {
    //         const status = 403;
    //         res.status(403)
    //             .json({
    //                 status: 403,
    //                 data: { error },
    //                 message: error.message
    //             });
    //     });
}

module.exports = {
    getAllUser,
    postUser
};