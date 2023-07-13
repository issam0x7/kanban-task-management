var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const getBoardsRouter = require('./routes/getBoardsRouter');
const getBoardRouter = require('./routes/getBoardRouter');
const createBoardRouter = require('./routes/createBoardRouter');
const updateBoardRouter = require('./routes/updateBoardRouter');
const deleteBoardRouter = require('./routes/deleteBoardRouter');

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
