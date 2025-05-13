import Joi from "joi";

const createUserDocument_TBSchema = Joi.object({
  userId: Joi.integer().required(),
  document: Joi.string().max(20).required(),
  typeDocumentId: Joi.integer().required(),
  placeExpedition: Joi.string().max(60).required(),
  dateExpedition: Joi.date().required()
});

export { createUserDocument_TBSchema };