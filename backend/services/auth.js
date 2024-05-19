const httpStatus = require("http-status");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const { generateAuthToken } = require("./tokenService");




const login =  async (credentials) => {
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


module.exports = {
    login
}