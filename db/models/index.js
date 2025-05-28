const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  // Add other models initialization here
  // e.g., Product.init(ProductSchema, Product.config(sequelize));
  // e.g., Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
