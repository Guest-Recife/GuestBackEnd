import UserService from '../services/user';
import BaseController from './base';

export default class User extends BaseController {
  constructor() {
    super();

    this.userService = new UserService();

    this.login = this.login.bind(this);
  }

  async login(req, res) {
    this.handleSuccess(res, 'OLA FULL');
  }
}
