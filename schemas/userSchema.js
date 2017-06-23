var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    full_name: {type: String, default: null},
    date_of_birth: {type: Date},
    email: {type: String, default: null},
    gender: {type: String, default: null},
    phone_number: {type: Number, default: 9999999999},
    picture: {type: String, default: '/assets/profile/Dream.png'},
    status: {type: String, default: "Y"},
    source: {type: String, default: "custom"},
    socket_id: {type: String},
    address: {type: String},
    onLine:{type:Boolean,default:false},
    lastModDateTime: {type: Date},
    createdDatetime: {type: Date}
});
var UserSchema =  mongoose.model('users', userSchema);


function UserSchemaModel() {
    this.userModelSchema = UserSchema;
}

UserSchemaModel.prototype.find = function(params,callback){
    this.userModelSchema.find(params.source,callback).sort(params.sort).skip(params.skip).limit(params.limit);
};

UserSchemaModel.prototype.findById = function(params,callback){
    this.userModelSchema.findOne(params.source,callback);
};

UserSchemaModel.prototype.create = function(data,callback){
    var self = this, update = data;
    update.createdDatetime = new Date().toUTCString();
    update.lastModDateTime = new Date().toUTCString();
    update.loginCount = 0;
    self.userModelSchema.create(update, callback);
};

UserSchemaModel.prototype.update = function(id,data,callback){
    var conditions = {_id: id}, update = data, options = {multi: true};
    update.lastModDateTime = new Date().toUTCString();
    this.userModelSchema.update(conditions, update, options, function (err, result) {
        callback(err, update);
    });
};

UserSchemaModel.prototype.delete = function(id,callback){
    this.userModelSchema.remove({_id: id}, callback);
};

UserSchemaModel.prototype.search = function(params,callback){
    this.userModelSchema.find(params.search, callback).sort(params.sort).skip(params.skip).limit(params.limit);
};

module.exports = UserSchemaModel;