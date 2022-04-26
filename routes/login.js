var express = require('express');
var router = express.Router();
const User = require("../modules/User");
const Avatar = require("../modules/Avatar");
const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
// const saltRounds = process.env.SALT;
// const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/somemiddleware');
// const secret = String(process.env.SECRET);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post("/",async function(req,res,next){
  const {username,password} = req.body;

  const user = await User.findOne({name:username});
  // const match = await bcrypt.compare(password,user.password);
//   console.log("match",match);

  if (user) {
		// const payload = { id: user._id, name: username };
		// const token = jwt.sign(payload, secret);
		// res.cookie("accessToken", token);
	
		console.log("cookie Access");
		res.redirect("/profile");
	} else {

  res.redirect("/login");
  }
  // res.redirect("/profile");
})

module.exports = router;
