const express = require('express');
const { config } = require('../config/config');
const jwt = require('jsonwebtoken');


const router = express.Router();
const passport = require('passport');

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        message: 'Logged in successfully',
        user: req.user,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
