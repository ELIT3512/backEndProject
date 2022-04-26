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
  res.render('editAvatar');
});

module.exports = router;
