import RegisterServices from '../services/register';
import BaseController from './base';

export default class Register extends BaseController {
  constructor() {
    super();

    this.registerServices = new RegisterServices();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
  }

  async create(req, res) {
    try {
      const options = {
        code: req.data.code,
        user_id: req.auth_data.user_id,
        restaurant_id: req.filter.restaurant_id
      };

      const resp = await this.registerServices.create(options);

      this.handleSuccess(res, resp);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async close(req, res) {
    try {
      const resp = await this.registerServices.close({ id: req.filter.id });

      this.handleSuccess(res, resp);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
