const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id:Number,
    name: String,
    password: String,
    inbox: Array,
    aLog: Array,
    friends: Array
});

userSchema.pre('validate', function(){
    console.log("pre");
});

userSchema.post('validate', function(){
    console.log("post");
});

userSchema.pre('validate', function(){
    console.log("pre2");
});

userSchema.post('validat', function(){
    console.log("post2");
});
const User = module.exports = mongoose.model('User', userSchema);
module.exports = User;
