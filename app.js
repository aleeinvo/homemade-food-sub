require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((error, req, res, next) => {
    if(error.name === 'SequelizeValidationError') {
        const errors = {};
        error.errors.forEach(e => {
            if(!errors[e.path]) {
                errors[e.path] = [];
            }

            errors[e.path].push(e.message);
        });
        return res.status(422).json({
            message: 'Please fix the following validation errors',
            errors
        })
    } else {
        next(error);
    }
})

module.exports = app;
