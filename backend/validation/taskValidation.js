const Joi = require("joi");

const updateTaskValidation = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),

  body: Joi.object().keys({
    title: Joi.string().min(3),
    description: Joi.string(),
    isCompleted: Joi.bool(),
  }),
};

const createTaskValidation = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    columnId: Joi.string(),
    isCompleted : Joi.boolean(),
    subTasks : Joi.array().items(Joi.object().keys({
        title : Joi.string(),
        isCompleted : Joi.boolean(),
    }))
  }),
};

module.exports = {
  updateTaskValidation,
  createTaskValidation,
};
