const Joi = require("joi");

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    columns: Joi.array().items(
      Joi.object().keys({ name: Joi.string(), color: Joi.string() })
    ),
    user : Joi.string().required()
  }),
};

const getBoard = {
  params : Joi.object().keys({
    id : Joi.string().required(),
  })
}

module.exports = {
  createBoard,
  getBoard
};
