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
    delete user.dataValues.recoveryToken; // Remove recovery token from response
    return user;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'Password changed successfully' };
    } catch (error) {
      boom.unauthorized();
    }
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

  async sendRecoveryPassword(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Unauthorized');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const link = `${config.frontendUrl}/recover-password?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.mail,
      to: user.email,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link para recuperar la contraseña</b>
             <a href="${link}">Recuperar contraseña</a>
             <p>Este link es válido por 15 minutos</p>
             <p>token</p>
             <p>${token}</p>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return {
      message: 'Recovery email sent successfully',
    };
  }
}

module.exports = AuthService;
