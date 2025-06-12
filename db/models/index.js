const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  // Add other models initialization here
  // e.g., Product.init(ProductSchema, Product.config(sequelize));
  // e.g., Category.init(CategorySchema, Category.config(sequelize));

  Customer.associate(sequelize.models);
}

module.exports = setupModels;
