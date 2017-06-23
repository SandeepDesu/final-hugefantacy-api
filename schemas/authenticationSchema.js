var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var authSchema = new Schema({
    person_id: {type: String},
    username: {type: String},
    password: {type: String},
    lastModDateTime: {type: Date},
    createdDatetime: {type: Date},
    loginCount: {type: Number, default: 0},
    ipAddress: {type: String, default: null},
    location: {type: String, default: null},
});

var authSchemaModel = mongoose.model('authusers', authSchema);

function AuthenticateSchemaModel() {
    this.authModelSchema = authSchemaModel;
}

AuthenticateSchemaModel.prototype.find = function(params,callback){
    this.authModelSchema.find(params.source,callback).sort(params.sort).skip(params.skip).limit(params.limit);
};

AuthenticateSchemaModel.prototype.findById = function(params,callback){
   this.authModelSchema.findOne(params.source,callback);
};

AuthenticateSchemaModel.prototype.create = function(data,callback){
    var self = this, update = data;
    update.createdDatetime = new Date().toUTCString();
    update.lastModDateTime = new Date().toUTCString();
    update.loginCount = 0;
    self.authModelSchema.create(update, callback);
};

AuthenticateSchemaModel.prototype.update = function(email,data,callback){
    var conditions = {email: email}, update = data, options = {multi: true};
    update.lastModDateTime = new Date().toUTCString();
    this.authModelSchema.update(conditions, update, options, function (err, result) {
        callback(err, update);
    });
};

AuthenticateSchemaModel.prototype.delete = function(email,callback){
    this.authModelSchema.remove({email: email}, callback);
};

AuthenticateSchemaModel.prototype.search = function(params,callback){
    this.authModelSchema.find(params.search, callback).sort(params.sort).skip(params.skip).limit(params.limit);
};

module.exports = AuthenticateSchemaModel;
