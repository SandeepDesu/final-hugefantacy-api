var UserSchema = require('../schemas/userSchema');
var AuthenticationSchema = require('../schemas/authenticationSchema')

function AuthModel() {

}

AuthModel.prototype.customLogin = function (body, callback) {

};

AuthModel.prototype.facebookLogin = function (body, callback) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'picture', 'location', 'birthday'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    request.get({
        url: accessTokenUrl, qs: {
            code: body.code,
            client_id: "1173066672804053",
            client_secret: "3acafa23330c91410de531a73f652c1a",
            redirect_uri: "https://hugefantacy.in/",
            grant_type: 'authorization_code'
        }, json: true
    }, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            callback({status:response.statusCode,data:{message:"Error while getting facebook access token"}});
        }else{
            request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response) {
                    if(err){
                        callback({status:404,data:{message:"Error while getting facebook user data"}});
                    }else{
                        AuthenticationSchema.findOne({username:response.body.email},function(err,res){

                        })
                    }
            });
        }

    });
};

AuthModel.prototype.githubLogin = function (body, callback) {

};

module.exports = AuthModel;