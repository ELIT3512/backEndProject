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
  const aUser = await User.findById(userId);
  let friendId = req.params.id;
  console.log("fid",friendId);
  let friend = await User.findById(friendId).populate("avatar");

  console.log("id",aUser);
  res.render('friendDetail',{aUser,friend});
});

router.post("/:id",verifyToken,async function(req,res,next){
  const userId = req.id;
  const aUser = await User.findById(userId);
  res.render("friendList",{aUser})
});

module.exports = router;
