var express = require('express');
var router = express.Router();
const User = require("../modules/User");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;
const jwt = require('jsonwebtoken');
const secret = String(process.env.SECRET);

const verifyToken = async(req,res,next)=>{
   jwt.verify(req.cookies.accessToken,secret,(err,decoded)=>{
       
     
        if(err){
            console.log("Access Denied")
            
            res.redirect("/login");
        }else{
            req.id = decoded.id;
            console.log("decoded",decoded.id);
            console.log("Your good to gooo");
            
            next();
        }
       
    });
    
};

module.exports = verifyToken; 