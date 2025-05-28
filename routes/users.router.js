const express = require('express');
const UserService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
// const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

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

module.exports = router;
