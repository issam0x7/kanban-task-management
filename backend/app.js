const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const boardRouters = require('./routes/boardRoutes');

var app = express();

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/boards', boardRouters);

app.use(errorHandler);

module.exports = app;
