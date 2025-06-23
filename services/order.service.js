const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: ['user']
        }
      ],
      order: [['id', 'ASC']]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
