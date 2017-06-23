var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatSchema = new Schema({
    person_id:{type:String},
    group_type:{type:String,default:"one-to-one"},
    list:[
        {group_id:{type:String},name:{type:String},group_members_id:[{name:{type:String},id:{type:String}}]}
    ]
});
module.exports = mongoose.model('chats', chatSchema);
