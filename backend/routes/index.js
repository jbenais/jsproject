const express = require('express');
const router = express.Router();

const mbti = require('./mbti');
const orientation = require('./orientation');

router.use('/mbti', mbti);
router.use('/orientation', orientation);

router.get('/', function(req, res, next) {
    res.status(200);
    res.send('Index');
});

module.exports = router;