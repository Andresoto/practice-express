const express = require('express');

const router = express.Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const { loginAuthSchema, recoveryAuthSchema, changePasswordAuthSchema} = require('../schemas/auth.schema');

const authService = new AuthService();

router.post('/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const userLogged = authService.singToken(user);
      res.json({
        message: 'Logged in successfully',
        user: userLogged.user,
        token: userLogged.token
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery-password',
  validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    const { email } = req.body;
    try {
      const rta = await authService.sendRecoveryPassword(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/change-password',
  validatorHandler(changePasswordAuthSchema, 'body'),
  async (req, res, next) => {
    const { token, newPassword } = req.body;
    try {
      const rta = await authService.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
