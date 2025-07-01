const boom = require('@hapi/boom');

const { config } = require('../config/config');

const API_KEY = config.apiKey;

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === API_KEY) {
    next();
  } else {
    next(boom.unauthorized('API key is invalid'));
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user && user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden('You do not have permission to perform this action'));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('You do not have permission to perform this action'));
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
