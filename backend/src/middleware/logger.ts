import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;

export const logEvent = async (message, logfile) => {
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

export const logger = (req, res, next) => {
    const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvent(message, 'access.log');
    console.log(message);
    next();
}

