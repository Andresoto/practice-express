const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const passport = require('passport');

const router = express.Router();
const categoryService = new CategoryService();

router.get('/', async (req, res, next) => {
  try{
    const categories = await categoryService.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}
);

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryService.findOne(Number(id));
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const newCategory = req.body;
      const createdCategory = await categoryService.create(newCategory);
      res.status(201).json({
        message: 'Category created successfully',
        category: createdCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categoryService.update(Number(id), body);
      res.json({
        message: 'Category updated successfully',
        category: category,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryService.delete(Number(id));
      res.json({
        message: 'Category deleted successfully',
        category: category,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
