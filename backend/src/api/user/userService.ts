import User from "./userModel";
import { IUser } from "../../types";

class UserService {
  private UserModal = User;

  public async findAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await this.UserModal.find();

    return users;
  }
}

export default UserService;
