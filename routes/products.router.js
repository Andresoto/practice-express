const express = require('express');
const ProductService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema')

const router = express.Router();
const productService = ProductService.getInstance();

router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.findOne(Number(id));
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const newProduct = req.body;
    const createdProduct = await productService.create(newProduct);
    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(Number(id), body);
      res.json({
        message: 'Product updated successfully',
        product: product,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
