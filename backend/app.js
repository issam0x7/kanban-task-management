const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const {errorHandler, errorConverter} = require('./middleware/errorHandler');

const loginLimiter = require('./middleware/loginLimiter');
const router = require('./routes/v1');
const httpLogger = require('./config/httpLogger');

var app = express();


// Handle CROS 
app.use(cors());


app.use(httpLogger);
// app.use(logger);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/v1', router);

// Error converter 
app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
