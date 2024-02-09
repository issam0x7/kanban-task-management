const morgan = require("morgan");
const config = require("../config/config");
const logger = require("./logger");

const getIpFormat = () =>
  config.env === "production" ? ":remote-addr - " : "";
const responseFormat = `:remote-addr - :method :url :status - :response-time ms`;

const httpLogger = morgan(responseFormat, {
  stream: {
    write: (message) => {
      logger.info(message);
    },
  },
});


module.exports = httpLogger;
