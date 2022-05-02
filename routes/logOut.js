var express = require('express');
var router = express.Router();
const User = require("../modules/User");
const Avatar = require("../modules/Avatar");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyTok');
const secret = String(process.env.SECRET);



/* GET home page. */
router.get('/:id',verifyToken,async function(req, res, next) {
    let id = req.id;
    let aUser = await User.findById(id);
  res.render('logOut',{aUser});
});

router.post("/",verifyToken, async function(req,res,next){
 
    let id = req.id;
    let aUser = await User.findById(id);
 
  


 res.clearCookie('accessToken');
  res.redirect("/login");
  

});

module.exports = router;