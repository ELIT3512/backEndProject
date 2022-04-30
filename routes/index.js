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
router.get('/',verifyToken,async function(req, res, next) {
        
        let id = req.id;
    let aUser = await User.findById(id);
    let avaterUsrs = await User.find();
    console.log("aUser",avaterUsrs)
    res.render('home',{aUser,avaterUsrs});
 
 
});

module.exports = router;
