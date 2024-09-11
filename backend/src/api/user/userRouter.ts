import { Routes } from "@/interfaces/routes.interface";
import { NextFunction, Request, Response, Router } from "express";
import UserController from "./userController";

class UserRouter implements Routes {
  path = "/user";
  router: Router = Router();
  userController = new UserController();

  constructor() {
    this.initailizeRoutes();
  }

  private initailizeRoutes() {
    this.router.get(
      "/user",
      (req: Request, res: Response, next: NextFunction) => {
        console.log("user router");
        next();
      },
    );
    this.router.get("/users", this.userController.getAllUsers);
  }
}

export default UserRouter;
