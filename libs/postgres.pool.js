const { Pool } = require('pg');

const { config } = require('../config/config');
const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;

const pool = new Pool({
  connectionString: URI,
});


module.exports = pool;
