const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequalize');

class ProductService {

  static _productsServiceInstance = null;

  static getInstance() {
    if (!ProductService._productsServiceInstance) {
      ProductService._productsServiceInstance = new ProductService();
    }
    return ProductService._productsServiceInstance;
  }

  constructor() {
    this.products = [];
    this.generateProducts();
    // this.pool = pool;
    // this.pool.on('error', (err) => {
    //   console.error('Unexpected error on idle client', err);
    //   process.exit(-1);
    // });
  }

  generateProducts() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: index + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async find() {
    const query = 'SELECT * FROM task';
    // const rta = await this.pool.query(query);
    const [ data, metadata ] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

}

module.exports = ProductService;

