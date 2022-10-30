import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

import BaseService from './base';
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
      attributes: ['password']
    });

    if (!user || !user.password) {
      user = {
        password: '$2a$08$YTIm1/6fQJSHQ1q0Nh.VB.rycPGkDJcZQXNq7eoR/955xWH7Hq1V.'
      };
    }

    return bcrypt.compareSync(data.password, user.password);
  }

  register(data) {
    return this.userRepository.create(data);
  }
}
