const { Schema } = require("mongoose");
const pick = require("../utils/pick");
const Joi = require("joi");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

/**
 *  Validate a Request based on given schema
 * @param {Schema}
 */

const validate = (schema) => (request, response, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(request, Object.keys(validSchema));
    console.log(object)

    const { value, error } = Joi.compile(validSchema).validate(object, {errors : { label : "key"}});

    if (error) {
      // Handle errors
      return next(new ApiError(httpStatus.BAD_REQUEST, error.message))
    }
    Object.assign(request, value);
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = validate;
