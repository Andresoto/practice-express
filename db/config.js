const { config } = require('../config/config');


module.exports = {
  development: {
    url: config.dtUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dtUrl,
    dialect: 'postgres',
  },
}
