const Joi = require("joi");
const { email } = require("../config/config");




const loginSchema = Joi.object({
    body : Joi.object({
        email : Joi.string().email(),
        password : Joi.string()
    })
})



module.exports = {
    loginSchema
}