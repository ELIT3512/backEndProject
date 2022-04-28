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
  console.log("id",aUser);
  res.render('editAvatar',{aUser});
});

router.post("/",verifyToken, async function(req,res,next){
  const id = req.id;
  let aUser = await User.findById(id).populate("avatar");
  let avtrId = aUser.avatar._id;
  // console.log("avtrId",avtrId)
  
  const powerLevels = [1,2,3,4,5];
  let randomPwLv = powerLevels[Math.floor(Math.random() * powerLevels.length)];
  const aAvtr = ({
    name: req.body.name,
    powerType: req.body.powerType,
    powerlevel: randomPwLv
    
    });
    
  
    aUser = await User.findByIdAndUpdate(id,{avatar: aAvtr}).populate("avatar");
    Avatar.findByIdAndUpdate(avtrId,aAvtr,()=>{
    console.log("aAvtr updated",aAvtr);
})
  
  res.render("profile",{aUser});
});

module.exports = router;
