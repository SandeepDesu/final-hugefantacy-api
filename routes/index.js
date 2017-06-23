var express = require('express'),
    router = express.Router();

router.use('/v1/auth', require('./authRouter'));

module.exports = router;
