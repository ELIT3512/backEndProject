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


/* GET home page. */
router.get('/:id',verifyToken, async function(req, res, next) {
  const id = req.id;
  const aUser = await User.findById(id);
  
  let friendArr = await aUser.populate("friends");
  let friendList = friendArr.friends;
  // let arr = [];
  // await friendArr.forEach(element => {
  //  let fr = User.findById(element._id);
  //  arr.push(fr);
  // });
  // console.log("arr",arr);
  console.log("friendArr",friendArr.friends);
  res.render('friendList',{aUser,friendList});
});

module.exports = router;
