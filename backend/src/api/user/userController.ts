import httpStatus from "http-status";
import { NextFunction, Response, Request } from "express";
import UserService from "./userService";

class UserController {
  private userService = new UserService();

  public getAllUsers = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const users = await this.userService.findAllUsers();
    console.log(users);
    res.status(httpStatus.OK).json(users);
  };
}

export default UserController;
