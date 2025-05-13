import Joi from "joi";

const createTypeDocument_TBSchema = Joi.object({
  nameTypeDocument: Joi.string().max(50).required(),
});

export { createTypeDocument_TBSchema };