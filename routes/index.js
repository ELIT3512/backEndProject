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
const ChatBox = require('../modules/ChatBox');


/* GET home page. */
router.get('/',verifyToken,async function(req, res, next) {
        let match = false;
        let id = req.id;
    let aUser = await User.findById(id);
    let avaterUsrs = await User.find();
    let chatDB = await ChatBox.find()
    let userinbox =  aUser.inbox;
    let chatBoxID = [];
        await chatDB.forEach((Element,index) =>{
            if(id == Element.user1){
                console.log("match")
                console.log("chatObject model",chatDB[index]);
                let cht = chatDB[index];
                chatBoxID.push(cht);
                
            }
        console.log("user",id)
        console.log("e.id",chatDB)
        console.log("ele",chatBoxID);
        console.log("UI",userinbox)
    })
    let avtrU = [];
    for(let i = 0;i<avaterUsrs.length;i++)
    {
        if(avaterUsrs[i].name != aUser.name){
            avtrU.push(avaterUsrs[i]);
        }
    }
    // User.findOneAndUpdate({name:aUser.name},{$push: {inbox: cht}});
    console.log("aUser",avtrU)
    res.render('home',{aUser,avtrU});
 
 
});

module.exports = router;
