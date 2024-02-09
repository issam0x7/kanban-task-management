const { Schema } = require("mongoose");
const pick = require("../utils/pick");
const Joi = require("joi");

/**
 *  Validate a Request based on given schema
 * @param {Schema}
 */

const validate = (schema) => (request, response, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(request, Object.keys(request));
    const { value, error } = Joi.compile(validSchema).validate(object);

    if (error) {
      // Handle errors
      console.log(error);
    }
    Object.assign(req, value);
    return next();
  } catch (err) {
    console.log(err)
  }
};

module.exports = validate;
