const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id:Number,
    name: String,
    password: String,
    inbox: [{type: Schema.Types.ObjectId,ref:"ChatBox"}],
    friends: [{type: Schema.Types.ObjectId,ref:"User"}],
    avatar: {}
});


const User = module.exports = mongoose.model('User', userSchema);
module.exports = User;
