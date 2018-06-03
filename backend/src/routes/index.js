const express = require('express');
const router = express.Router();

const mbti = require('./mbti');
const orientation = require('./orientation');
const target = require('./target');
const user = require('./user');
const address = require('./address');
const userPreferences = require('./userPreferences');

router.use('/mbti', mbti);
router.use('/orientation', orientation);
router.use('/target', target);
router.use('/user', user);
router.use('/address', address);
router.use('/user_preferences', userPreferences);

router.get('/', function(req, res, next) {
    res.status(200);
    res.send('Index');
});

module.exports = router;