'use strict';

const { DataTypes } = require('sequelize');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true, // Ensures one-to-one relationship with User
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
