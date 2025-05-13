import Joi from "joi";

const createCountry_TBSchema = Joi.object({
  countryCode: Joi.string().max(4).required(),
  countryName: Joi.string().max(100).required()
});

export { createCountry_TBSchema };