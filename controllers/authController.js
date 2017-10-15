var AuthModel = require('../models/authModel'),
    ac = new AuthModel();

function AuthController() {

}

AuthController.prototype.authenticate = function (req, res, next) {
    if (req.params.authenticate === 'custom') {
        this.custom(req, res, next);
    } else if (req.params.authenticate === 'facebook') {
        this.facebook(req, res, next);
    } else if (req.params.authenticate === 'google') {
        this.google(req, res, next);
    }else if (req.params.authenticate === 'register') {
        this.register(req, res, next);
    } else {
        res.status(400).send({message: "Please check your api request"});
    }
};

AuthController.prototype.custom = function (req, res, next) {
    ac.customLogin(req.body, function (result) {
        res.status(result.status).send(result.data);
    });
};

AuthController.prototype.facebook = function (req, res, next) {
    ac.facebookLogin(req.body, function (result) {
        res.status(result.status).send(result.data);
    });
};

AuthController.prototype.google = function (req, res, next) {
    console.log(req.body);
    ac.googleLogin(req.body, function (result) {
        res.status(result.status).send(result.data);
    });
};

AuthController.prototype.register = function (req, res, next) {
    ac.register(req.body, function (result) {
        res.status(result.status).send(result.data);
    });
};

module.exports = AuthController;