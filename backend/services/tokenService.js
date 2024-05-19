const { addMinutes, addDays } = require("date-fns")
const config = require("../config/config")
var jwt = require('jsonwebtoken')
const Token = require("../models/tokenModel")
const { TOKEN_TYPES } = require("../config/tokens")



const generateJwtToken = (userId, expire,type, secret = config.jwt.secret) => {
    const payload = {
        sub : userId,
        exp : addMinutes(new Date(), expire).getTime(),
        expire: addMinutes(new Date(), expire) ,
        type
    }

    const token = jwt.sign(payload, secret);
    return token
}



const saveToken  =async (token, userId , type, expireAt) => {
    const tokenDoc = await Token.create({
        token,
        user : userId,
        type,
        expires : expireAt
    })

    return tokenDoc;

}


const verifyToken = async (token,type) => {
    const payload = jwt.verify(token, config.jwt.secret);

    const tokenDoc  = await Token.findOne({ token, type, user : payload.sub })

    if(!tokenDoc) {
        throw new Error('token not found');
    }

    return tokenDoc
}


const generateAuthToken =async (userId) => {

    const accessTokenExpire = addMinutes(new Date(), config.jwt.accessExpirationMinutes);

    const refreshTokenExpire = addDays(new Date(), config.jwt.refreshExpirationDays);

    const secret = config.jwt.secret;

    const accessToken = generateJwtToken(userId,accessTokenExpire, TOKEN_TYPES.ACCESS, secret);

    const refreshToken = generateJwtToken(userId, refreshTokenExpire, TOKEN_TYPES.REFRESH, secret);

    

    await saveToken(refreshToken, userId, TOKEN_TYPES.REFRESH, refreshTokenExpire);

    return {
        accessToken : {
            token : accessToken,
            expireAt : accessTokenExpire
        },
        refreshToken : {
            token : refreshToken,
            expireAt : refreshTokenExpire
        }
    }

}


module.exports = {
    verifyToken,
    generateAuthToken,
}