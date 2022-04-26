const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const avatarSchema = new Schema({
    id:String,
    name: String,
    powerType: String,
    powerlevel: Number,
    health: Number,
    victories: Number

    
});

// avatars can have one of four powers [water,fire,earth,wind],
// avatars also git a power level by random when created,
// every time u log in, u can edit ur power level with one new random power level,
// avatars have a health bar- 1000hp,
// avatars grow in health after every succesful battle,
// during chats with other users the avatars battle,
// each time a user send a msg to another user, 
// the msgsenders avatar attcks the recievers avatar,
// attack damage is determined by the avatars power level * a random msg number
// each time a msg is sent it generates the random msg number,
// power levers [1,2,3,4,5]
// msg power level [1,....,50]
// avatars health reset after every fineshed battle ||
// 24hrs have passed sense inital msg.
// upon a fineshed batlle each user receive a msg
// winner : some victory msg. victoy imagae displayed, plus levelup on health for the avatar
// each victory adds 100hp to total hp for avatar.  
// loser : loser msg. defeat image displayed

const Avatar = mongoose.model('Avatar', avatarSchema);
module.exports = Avatar;
