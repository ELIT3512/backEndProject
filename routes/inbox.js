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
  console.log("body==",req.body)
  res.render('inbox',{aUser});
});

router.post("/",function(req,res,next){
res.redirect("/inbox")
})

module.exports = router;
