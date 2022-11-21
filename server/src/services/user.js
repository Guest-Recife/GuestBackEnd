import { Op } from 'sequelize';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import BaseService from './base';
import auth from '../constants/auth';
import UserRepository from '../repositories/user';

export default class User extends BaseService {
  constructor() {
    super();

    this.userRepository = new UserRepository;
  }

  async login(data) {
    const filter = {
      [Op.or]: [
        { email: data.login },
        { phone: data.login }
      ]
    };

    let user = await this.userRepository.findOne({
      where: filter,
      attributes: ['id', 'password']
    });

    if (!user || !user.password) {
      user = {
        password: '$2a$08$YTIm1/6fQJSHQ1q0Nh.VB.rycPGkDJcZQXNq7eoR/955xWH7Hq1V.'
      };
    }

    const userValidated = compareSync(data.password, user.password);

    if (!userValidated) {
      throw this.handleException({ error: 'LOGIN_OR_PASSWORD_INVALID', code: 400 });
    }

    return sign({ id: user.id }, auth.secret, {
      expiresIn: auth.expiration_time
    });
  }

  register(data) {
    return this.userRepository.create(data);
  }

  find(id) {
    return this.userRepository.findOne({
      where: {
        id
      },
      attributes: ['name', 'last_name', 'birth_date', 'email', 'gender', 'cpf', 'phone']
    });
  }

  async update(id, changes) {
    const options = {};

    if (changes.new_password) {
      const user = await this.userRepository.findOne({
        where: { id },
        attributes: ['password'],
        raw: true
      });

      const samePassword = compareSync(changes.password, user.password);

      if (!samePassword) throw this.handleException({ error: 'INVALID_PASSWORD' });

      options.individualHooks = true;
      changes.password = changes.new_password;
    }

    return this.userRepository.update({
      where: {
        id
      },
      ...options
    }, changes);
  }

  delete(id) {
    return this.userRepository.delete({
      where: {
        id
      },
      logging: true
    });
  }
}
