import BaseService from './base';
import UserRepository from '../repositories/user';

export default class User extends BaseService {
  constructor() {
    super();

    this.userRepository = new UserRepository;
  }
}
