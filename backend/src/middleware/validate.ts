import { Schema } from "mongoose";
import Joi from "joi";
import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/apiError";
/**
 *  Validate a Request based on given schema
 * @param {Schema}
 */

const validate = (schema) => (request, response, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(request, Object.keys(validSchema));

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
