import UserService from '../services/user';
import BaseController from './base';

export default class User extends BaseController {
  constructor() {
    super();

    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.find = this.find.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
      this.handleError(res, error);
    }
  }

  async find(req, res) {
    try {
      const user = await this.userService.find(req.auth_data.user_id);

      this.handleSuccess(res, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      await this.userService.update(req.auth_data.user_id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      await this.userService.delete(req.auth_data.user_id);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
