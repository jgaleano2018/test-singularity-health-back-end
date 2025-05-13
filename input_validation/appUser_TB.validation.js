import Joi from "joi";

const createAppUser_TBSchema = Joi.object({
  name: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  isMilitar: Joi.boolean().required(),
  timeCreate: Joi.date().required(),
  isTemporal: Joi.boolean().required(),
  userName: Joi.string().max(50).required(),
  password: Joi.string().max(50).required(),
  email: Joi.string().max(200).required(),
  emailVerified: Joi.string().max(200).required(),
  verificationToken: Joi.string().max(200).required()
});

export { createAppUser_TBSchema };