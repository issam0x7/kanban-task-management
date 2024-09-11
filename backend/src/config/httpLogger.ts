import morgan from "morgan";
import logger from "./logger";
import config from "./config";

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
