import httpStatus from 'http-status';
const User = require("../models/userModel");
const { verifyToken } = require("../services/tokenService");




const auth = () => async (req, res, err, next) => {

    const headerToken = req.headers.Authorization;

    if(!headerToken || !headerToken.startWith('Bearer ')) {
        return res.status(httpStatus.UNAUTHORIZED).send("user not found")
    }

    const token  = headerToken.splite(' ')[1];

    const isValidToken = await verifyToken(token) ;

    if(!isValidToken) {
        return res.status(httpStatus.UNAUTHORIZED).send("user not found")
    }


    console.log(isValidToken)

    

    const user = await User.find({_id : req.userId})

    if(user) {
        next()
    }
}


module.exports = auth;