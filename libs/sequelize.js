const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const sequelize = new Sequelize(config.dtUrl, {
  dialect: 'postgres',
  logging: false, // Set to false to disable logging
  }
);

setupModels(sequelize);
// Test the connection (optional)
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// sequelize.sync(); // This will create the tables if they do not exist
// sequelize.sync({ force: true }); // Use this to drop and recreate tables (use with caution)
// If you want to drop all tables and recreate them, uncomment the line above
// and comment the line above it. This is useful during development but should be used with caution in production.
// If you want to use migrations instead of sync, you can set up Sequelize CLI and run migrations separately.

module.exports = sequelize;
