import { compare } from "bcrypt";
import User from "../userModel";

class AuthService {
  private login = async (email: string, password: string) => {
    const user = await User.findOne({ email: email });

    if (!user) return;

    const isPasswordMatching = compare(user.password, password);
  };
}
