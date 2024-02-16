const { logEvent } = require("./logger");

const errorConverter = (err, req, res, next) => {
  const error = err;
  console.log(err)
  console.log("TYPE OF ERROR : ", typeof error);

  console.log("ERROR_CONVERTER : ", err.message);

  return next(err);
};

const errorHandler = (err, req, res, next) => {
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error.log"
  );

  const status = err.statusCode ? err.statusCode : 500;

  res.status(status).send({ message: err.message });
};

module.exports = {
  errorConverter,
  errorHandler,
};
