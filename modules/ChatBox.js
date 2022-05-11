const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chatSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: 'Users'},
    user2: { type: Schema.Types.ObjectId, ref: 'Users'},
    msgs: [String]
  
});


const ChatBox = module.exports = mongoose.model('ChatBox', chatSchema);
module.exports = ChatBox;
