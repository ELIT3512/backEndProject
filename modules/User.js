const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id:Number,
    name: String,
    password: String,
    inbox: Array,
    aLog: Array,
    friends: Array,
    avatar: {}
});


const User = module.exports = mongoose.model('User', userSchema);
module.exports = User;
