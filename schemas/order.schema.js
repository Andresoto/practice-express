const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  total: Joi.number(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  total: Joi.number(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
};
