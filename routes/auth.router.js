const express = require('express');

const router = express.Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');

const authService = new AuthService();

router.post('/login',
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

router.post('/recover-password',
  async (req, res, next) => {
    const { email } = req.body;
    try {
      const rta = await authService.sendMail(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
