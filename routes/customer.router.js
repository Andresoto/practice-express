const express = require('express');
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const customerService = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
}
);

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customerService.findOne(Number(id));
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const newCustomer = req.body;
      const createdCustomer = await customerService.create(newCustomer);
      res.status(201).json({
        message: 'Customer created successfully',
        customer: createdCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await customerService.update(Number(id), body);
      res.json({
        message: 'Customer updated successfully',
        customer: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customerService.delete(Number(id));
      res.json({
        message: 'Customer deleted successfully',
        customer: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
