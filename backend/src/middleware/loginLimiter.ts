import rateLimit from 'express-rate-limit';
import { logEvent } from './logger';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: {
        message: 'Too many login attempts, please try again after a 60 second pause',
    },
    handler: (req, res, next, options) => {
        logEvent(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error.log');
        res.status(options.statusCode).json(options.message);
    },
    standerdHeaders: true, // Send standard rate limit header with limit and remaining
    legacyHeaders: false, // Disable the X-RateLimit-* headers
});

module.exports = loginLimiter;