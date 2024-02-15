const httpStatus = require("http-status")
const User = require("../models/userModel")
const { nextDay } = require("date-fns")




const auth = () => async (req, res, err, next) => {

    if(!req.body.userId) {
        return res.status(httpStatus.UNAUTHORIZED).send("user not found")
    }

    const user = await User.find({_id : req.userId})

    if(user) {
        next()
    }
}


module.exports = auth;