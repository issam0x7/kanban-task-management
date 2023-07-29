const { logEvent } = require('./logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error.log');
    console.error(err.stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status);

    res.json({ message: 'Server Error' })
}