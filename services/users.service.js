const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserService {

  constructor() {}

  async find() {
    const cliente = await getConnection();
    const rta = await cliente.query('SELECT * FROM task');
    return rta.rows;
  }

}

module.exports = UserService;
