import express from "express";
import { Routes } from "./interfaces/routes.interface";
import { LOG_DIR, MONGODB_URL, NODE_ENV, PORT } from "./config/config";
import mongoose, { connect, set } from "mongoose";
import { dbConnection } from "./config/database";
import UserRouter from "./api/user/userRouter";
import { logger, stream } from "./utils/logger";
import morgan from "morgan";

class App {
  public app: express.Application;
  public port: number | string;
  public env: string;

  constructor() {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || "development";

    this.connectToDB();
    this.setupRoutes();
    this.initializeMiddlewares();
  }

  private async connectToDB() {
    if (this.env === "development") {
      set("debug", true);
    }

    await connect(dbConnection.url, {
      ...dbConnection.options,
    });
  }
  private initializeMiddlewares() {
    this.app.use(morgan("dev", { stream }));
  }

  private setupRoutes() {
    this.app.use("/api", new UserRouter().router);
  }

  listen() {
    logger.info("-------------- Starting --------------");

    mongoose.connection.on("connected", () => {
      logger.log({
        level: "info",
        message: "database connected",
      });
      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    });

    mongoose.connection.on("error", (error: Error) => {
      console.log(error);
    });
  }
}

export default App;
