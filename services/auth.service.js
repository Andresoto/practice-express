const boom = require('@hapi/boom');
const UserService = require('./users.service');
const bcrypt = require('bcrypt');
const { config } = require('../config/config');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const userService = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid email or password');
    }
    delete user.dataValues.password; // Remove password from response
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendMail(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Unauthorized');
    }
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail({
      from: config.mail,
      to: user.email,
      subject: 'Password Recovery',
      text: 'Please click the link to recover your password.',
      html: '<b>Please click the link to recover your password.</b>',
    });

    return {
      message: 'Recovery email sent successfully',
    };
  }
}

module.exports = AuthService;
