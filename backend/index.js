const { default: mongoose } = require("mongoose");
const config = require("./config/config");
const app = require("./app");
const logger = require("./config/logger");

let server = "";

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.port, () => {
      console.log(`listening to port : ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
