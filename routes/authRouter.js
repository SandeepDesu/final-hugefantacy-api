var express = require('express');
var router = express.Router();
var auth = require('../utils/middleAuth');
var AuthController = require('../controllers/authController');
var lc = new AuthController();

router.post('/:authenticate',auth,lc.authenticate.bind(lc));

module.exports = router;
