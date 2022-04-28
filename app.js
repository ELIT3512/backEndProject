const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const hbs = require('hbs');
const session = require('express-session')
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;
const jwt = require('jsonwebtoken')
const secret = String(process.env.SECRET);


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/registerUsers');
const createAvtrRoute = require('./routes/createAvtr');
const friendDetailRoute = require("./routes/friendDetail");
const editAvtrRoute = require("./routes/editAvtr");
const loginRoute = require("./routes/login");
const friendLRoute = require("./routes/friendList");
const profileRoute = require("./routes/profile");
const inboxRoute = require("./routes/inbox")

var app = express();

require('dotenv').config();

mongoose.connect(process.env.DB_URI,{
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
 

}).then(res => console.log("db connected"))
.catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registerUser', usersRouter);
app.use('/profile', profileRoute);
app.use('/createAvatar', createAvtrRoute);
app.use('/friendDetail', friendDetailRoute);
app.use('/editAvatar', editAvtrRoute);
app.use('/login', loginRoute);
app.use('/friendList', friendLRoute);
app.use('/inbox',inboxRoute);

app.use(session({
  secret:'Sec Session Key',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
