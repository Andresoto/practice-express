const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductService {

  static _productsServiceInstance = null;

  static getInstance() {
    if (!ProductService._productsServiceInstance) {
      ProductService._productsServiceInstance = new ProductService();
    }
    return ProductService._productsServiceInstance;
  }

  constructor() {
  }


  async find(query) {
    const options = {
      include: ['category'],
      order: [['id', 'ASC']],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price, price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max]
      };
    }
    if (price) {
      options.where.price = price;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    await product.destroy();
    return { id };
  }

}

module.exports = ProductService;

