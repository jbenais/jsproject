const express = require('express');
const router = express.Router();

const mbti = require('./mbti');
const orientation = require('./orientation');
const target = require('./target');
const user = require('./user');
const address = require('./address');
const userPreferences = require('./userPreferences');
const userTarget = require('./userTarget');
const matches = require('./matches');
const userPictures = require('./userPictures');
const channel = require('./channel');
const messages = require('./messages');
const notification = require('./notification');

router.use('/mbti', mbti);
router.use('/orientation', orientation);
router.use('/target', target);
router.use('/user', user);
router.use('/address', address);
router.use('/user_preferences', userPreferences);
router.use('/user_target', userTarget);
router.use('/matches', matches);
router.use('/user_pictures', userPictures);
router.use('/channel', channel);
router.use('/messages', messages);
router.use('/notification', notification);


router.get('/', function(req, res, next) {
    res.status(200);
    res.send('Index');
});

module.exports = router;