const Joi = require("joi");

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string(),
    columns: Joi.array(
      Joi.object().keys({ name: Joi.string(), color: Joi.string() })
    ),
  }),
};


module.exports = {
    createBoard,
}