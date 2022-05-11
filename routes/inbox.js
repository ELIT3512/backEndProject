var express = require('express');
var router = express.Router();
const User = require("../modules/User");
const Avatar = require("../modules/Avatar");
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyTok');
const ChatBox = require('../modules/ChatBox');
const secret = String(process.env.SECRET);


/* GET home page. */
router.get('/:id',verifyToken, async function(req, res, next) {
  const id = req.id;
  const aUser = await User.findById(id);
  let friendId = req.params.id;
  let chatDB = await ChatBox.find()
  
  let friend = await User.findById(friendId).populate("avatar");
  let friendInbox = friend.inbox;
  let aUserInbox = aUser.inbox;
  let match = false;
 
  console.log("friendInbox==",friendInbox)
  console.log("aUserInbox",aUserInbox)
  console.log("chatDB",chatDB[0]._id)
  console.log("friend==",friend)
  console.log("aUser",aUser)
  
  res.render('inbox',{aUser,friend});
});

router.post("/:id",verifyToken ,async function(req,res,next){

  const id = req.id;
  let aUser = await User.findById(id);
  let friendId = req.params.id;
  let friend = await User.findById(friendId).populate("avatar");
  let aUserInbox = aUser.inbox;
  let msgbody = req.body.chat
  let msg = aUser.name + ": " + msgbody

  const newChat = new ChatBox({
    user1: aUser,
    user2: friend,
    msgs: msg

   
  });
  newChat.save()

  // console.log(newUser);
 
  // console.log("chatDB",chatDB[0]._id)
res.redirect("/")
})

module.exports = router;