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




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registerUser');
});

router.post("/",function(req,res,next){
  const {username,password,repeatPassword} = req.body;
  // console.log(req.body);
  if(password != repeatPassword){
    res.send("passwords don't match");
  }else {
    // register new user
    
    // Hash passwords w/ Bcrypt
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("password hash is ", hash);
    // create new User model
    const newUser = new User({
      name: username,
      password: hash,
     
    });
    // save username and hashed password
    console.log(newUser);
    newUser.save();
  }
  
  res.redirect("/login");
})

module.exports = router;
