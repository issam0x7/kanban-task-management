import httpStatus from "http-status";
import AuthServices from "../services/auth.services";




export const login = async (req, res, next) =>{
    try {
        const user = await AuthServices.login(req.body);

        return res.status(httpStatus.OK).json(user)
        
        
    } catch (error) {
        return next(error)
    }
}
