import httpStatus from 'http-status';
import User from '../models/userModel';
import ApiError from '../utils/apiError';
import { generateAuthToken } from './tokenService';




export const loginService =  async (credentials) => {
    const user = await User.findOne({ email : credentials.email }).exec();
    
    if(!user) 
        throw new ApiError(httpStatus.NO_CONTENT, "user not found")

    const isPasswordMatch = await user.isPasswordMatch(credentials.password);
    if(!isPasswordMatch) {
         throw new ApiError(httpStatus.BAD_REQUEST, "password not correct")
    }

    const tokens = await generateAuthToken(user._id);



    return {user, tokens};
    

}


const AuthServices = {
    login : loginService
}

export default AuthServices;
