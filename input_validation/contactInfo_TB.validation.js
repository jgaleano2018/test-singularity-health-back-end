import Joi from "joi";

const createContactInfo_TBSchema = Joi.object({
  userId: Joi.integer().required(),
  address: Joi.string().max(60).required(),
  countryId: Joi.integer().required(),
  city: Joi.string().max(60).required(),
  phone: Joi.string().max(60).required(),
  cellPhone: Joi.string().max(60).required(),
  emerencyName: Joi.string().max(60).required(),
  emerencyPhone: Joi.string().max(60).required()
});

export { createContactInfo_TBSchema };