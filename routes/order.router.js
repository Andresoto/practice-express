const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service');
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema');

const router = express.Router();
const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderService.findOne(Number(id));
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const newOrder = req.body;
      const createdOrder = await orderService.create(newOrder);
      res.status(201).json({
        message: 'Order created successfully',
        order: createdOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
