const { login } = require("../../controllers/authContoller");
const validate = require("../../middleware/validate");
const { loginSchema } = require("../../validation/authValidation");

const router = require("express").Router();


router.post('/login', validate(loginSchema), login);




module.exports = router