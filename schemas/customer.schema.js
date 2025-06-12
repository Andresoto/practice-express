const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const phone = Joi.string().min(10).max(15);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
}).or('name', 'lastName', 'phone', 'userId').required().messages({
  'object.missing': 'At least one field must be provided for update',
  'object.unknown': 'Invalid field(s) provided for update',
  'any.required': 'At least one field is required for update',
  'object.base': 'Invalid update object format',
  'object.unknown': 'Unknown field(s) provided for update',
  'object.with': 'At least one field must be provided for update',
  'object.missing': 'At least one field must be provided for update',
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
