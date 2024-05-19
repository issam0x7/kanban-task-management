const httpStatus = require("http-status");
const { authSevice } = require("../services")



const login = async (req, res, next) =>{
    try {
        const user = await authSevice.login(req.body);

        return res.status(httpStatus.OK).json(user)
        
        
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    login
}