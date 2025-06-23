const productsRouter = require('./products.router');
const categoriesRouter = require('./category.router');
const usersRouter = require('./users.router');
const customerRouter = require('./customer.router');
const orderRouter = require('./order.router');
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
