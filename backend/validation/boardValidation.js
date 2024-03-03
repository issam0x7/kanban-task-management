const Joi = require("joi");

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    columns: Joi.array().items(
      Joi.object().keys({ name: Joi.string(), color: Joi.string() })
    ),
    user: Joi.string().required(),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const removeBoard = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    columns: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        color: Joi.string().required(),
      })
    ),
  }),
};

const updateBoardCloumns = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      color: Joi.string().required(),
    })
  ),
};

module.exports = {
  createBoard,
  getBoard,
  updateBoard,
  removeBoard,
};
