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
  res.render('createAvatar',{aUser});
});

router.post("/",verifyToken, async function(req,res,next){
  
  const id = req.id;
  let aUser = await User.findById(id);
  console.log("id",aUser);

  const {name,powerType} = req.body;
  const powerLevels = [1,2,3,4,5];
  let randomPwLv = powerLevels[Math.floor(Math.random() * powerLevels.length)];
  // console.log(req.body);
  
    // register new user
    
    
    // Hash passwords w/ Bcrypt
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(password, salt);
    // console.log("password hash is ", hash);
    // create new User model
    const aAvtr = new Avatar({
      name: name,
      powerType: powerType,
      powerlevel: randomPwLv,
      health: 1000,
      victories: 0
    });
    // need to add avatar to the user            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     aUser = await User.findByIdAndUpdate(id,{avatar: aAvtr}).populate("avatar");
      console.log("aUser2",aUser);
    // save username and hashed password
    // console.log(aAvtr);
    aAvtr.save();
  
  
  res.render("profile",{aUser});

});

module.exports = router;
