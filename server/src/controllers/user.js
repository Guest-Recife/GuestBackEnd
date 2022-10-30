import UserService from '../services/user';
import BaseController from './base';

export default class User extends BaseController {
  constructor() {
    super();

    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) {
    try {
      const token = await this.userService.login(req.data);

      this.handleSuccess(res, token);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async register(req, res) {
    try {
      await this.userService.register(req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(error);
    }
  }
}
