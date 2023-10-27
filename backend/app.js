const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const boardRouters = require('./routes/boardRoutes');
const tasksRouters = require('./routes/tasksRoutes');
const userRouters = require('./routes/userRouter');
const loginLimiter = require('./middleware/loginLimiter');

var app = express();

app.use(cors());

app.use(loginLimiter);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/boards', boardRouters);
app.use('/api/tasks', tasksRouters);
app.use('/api/users', userRouters);

app.use(errorHandler);

module.exports = app;
