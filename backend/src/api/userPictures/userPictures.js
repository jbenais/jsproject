const db = require('../index');
const MESSAGE_OK = 'OK';
const sqlMatches = require('../../sql').matches;


const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAI77PYSLX7B7M2QTA",
    secretAccessKey: "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"
});

var s3 = new AWS.S3();

function postUserPicture(req, res, next) {
    console.log('Posting picture');
    if (!req.files)
    {
        console.log(req.files)
        return res.status(400).send('No files were uploaded.');
    }
    else{
        const file = req.files.file;
        var params = {
            Bucket: 'meetmytype-bucket',
            Body: file.data,
            Key: `user_pictures/${file.name}`,
            ACL: 'public-read'
        };

        s3.upload(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            }
            if (data) {
                return res.status(200).send('Uploaded');
            }
        })
    }
}

module.exports = {
    postUserPicture
};