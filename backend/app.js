var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/boards', getBoardsRouter);
app.use('/api/boards', getBoardRouter);
app.use('/api/boards', createBoardRouter);
app.use('/api/boards', updateBoardRouter);
app.use('/api/boards', deleteBoardRouter);

module.exports = app;
