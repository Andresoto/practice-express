const express = require('express');
const UserService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const userService = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}
);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(Number(id));
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const newUser = req.body;
      const createdUser = await userService.create(newUser);
      res.status(201).json({
        message: 'User created successfully',
        user: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.update(Number(id), body);
      res.json({
        message: 'User updated successfully',
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await userService.delete(Number(id));
      res.json({
        message: 'User deleted successfully',
        response: response,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
