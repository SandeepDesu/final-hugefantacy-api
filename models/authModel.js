var request = require('request'),
    qs = require('querystring'),
    AuthLoginSchema = require('../schemas/authloginschema');

function AuthModel() {
    this.authLoginSchema = AuthLoginSchema();
}

AuthModel.prototype.customLogin = function (body, callback) {
//this.authLoginSchema     check if user exists or not if exits check username and password
};

AuthModel.prototype.facebookLogin = function (body, callback) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'picture', 'location', 'birthday'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    request.get({
        url: accessTokenUrl, qs: {
            code: body.code,
            client_id: "121943595164078",
            client_secret: "34c642a2b08b290fe648c2a8fa5e9b6d",
            redirect_uri: "https://hugefantacy.in/",
            grant_type: 'authorization_code'
        }, json: true
    }, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            callback({status: response.statusCode, data: {message: "Error while getting facebook access token"}});
        } else {
            request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response) {
                if (err) {
                    callback({status: 404, data: {message: "Error while getting facebook user data"}});
                } else {
                    console.log(response.body);
                    //this.authLoginSchema     use here inthis line you need to check if user already exists update them or crete it
                }
            });
        }

    });
};

AuthModel.prototype.googleLogin = function (body, callback) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token',accessToken;
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    request.post(accessTokenUrl, {json: true, form: {
        code: body.code,
        client_id: "563546280609-cuva1dgflqf76osoqguv2i6baikjr0nh.apps.googleusercontent.com",
        client_secret: "-a1A71fa-0tLiTS8NWmAuGIA",
        redirect_uri: "https://hugefantacy.in",
        grant_type: 'authorization_code'
    }}, function (err, response, token) {
        if (err) {
            return callback(err);
        }
        accessToken = token.access_token;
        headers = {Authorization: 'Bearer ' + accessToken};
        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response) {
            if (err) {
                return callback(err);
            }
            console.log(response.body);
            //this.authLoginSchema     use here inthis line you need to check if user already exists update them or crete it
        });
    });
};



AuthModel.prototype.register = function (body, callback) {
//this.authLoginSchema     check if user exists or not if exits return you already menber other wise create new user
};

module.exports = AuthModel;