var express = require('express');
var router = express.Router();
const User = require("../modules/User");
const Avatar = require("../modules/Avatar");
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyTok');
const secret = String(process.env.SECRET);




router.get('/:id',verifyToken, async function(req, res, next) {
  const userId = req.id;
  let match = false;
  const aUser = await User.findById(userId);
  let friendArr = await aUser.populate("friends");
  let friendList = friendArr.friends;
 
  let friendId = req.params.id;
  console.log("fid",friendId);
  let friend = await User.findById(friendId).populate("avatar");
  for(let i =0;i<friendList.length;i++){
    if(friendList[i].name == friend.name){
      match = true;
      break;
    }
  }
  console.log("id",aUser);
  res.render('friendDetail',{aUser,friend,match});
});

router.post("/:id",verifyToken,async function(req,res,next){
  const userId = req.id;
  let aUser = await User.findById(userId);
  let friendId = req.params.id;
    let friend = await User.findById(friendId);
  aUser = await User.findOneAndUpdate({name:aUser.name},{$push: {friends: friend}});
  console.log("aUser",aUser);
  res.render("profile",{aUser})
});

module.exports = router;
