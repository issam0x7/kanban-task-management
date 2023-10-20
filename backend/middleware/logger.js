const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require("fs").promises;
const path = require('path');

const logEvent = async (message, logfile) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logfile), logItem);
    } catch (err) {
        console.error(err);
    }
}

const logger = (req, res, next) => {
    const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvent(message, 'access.log');
    console.log(message);
    next();
}

module.exports = { logger, logEvent };