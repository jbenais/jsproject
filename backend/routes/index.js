const express = require('express');
const router = express.Router();

const mbti = require('./mbti');

router.use('/mbti', mbti);

router.get('/', function(req, res, next) {
    res.status(200);
    res.send('Index');
});

module.exports = router;