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
}
