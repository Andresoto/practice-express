const boom = require('@hapi/boom');
const { models } = require('./../libs/sequalize')

class CustomerService {

  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll(
      {
        include: ['user'],
        order: [['id', 'ASC']]
      }
    );
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
