const express = require('express');

const router = express.Router();
const passport = require('passport');

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      res.json({
        message: 'Logged in successfully',
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
