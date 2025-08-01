const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service')

const router = express.Router();

const orderService = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user;
      const orders = await orderService.findByUser(userId.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
