const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
}).or('name', 'image').required().messages({
  'object.missing': 'At least one field must be provided for update',
  'object.unknown': 'Invalid field(s) provided for update',
  'any.required': 'At least one field is required for update',
  'object.base': 'Invalid update object format',
  'object.unknown': 'Unknown field(s) provided for update',
  'object.with': 'At least one field must be provided for update',
  'object.missing': 'At least one field must be provided for update',
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
