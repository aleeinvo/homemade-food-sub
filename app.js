require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const validationHandle = require('./middlewares/validationHandle');
const validJWT = require('./middlewares/validJWT');
const isAdmin = require('./middlewares/isAdmin');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', [
    validJWT,
    isAdmin
]);
app.use('/users', usersRouter);

app.use(validationHandle);

module.exports = app;
