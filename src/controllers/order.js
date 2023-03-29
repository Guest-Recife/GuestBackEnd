import OrderServices from '../services/order';
import BaseController from './base';

export default class Order extends BaseController {
  constructor() {
    super();

    this.orderServices = new OrderServices();

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async create(req, res) {
    try {
      const data = {
        ...req.data,
        ...req.filter
      };

      await this.orderServices.create(data);

      this.handleSuccess(res, true);
    } catch (error) {
      this.handleError(res, error);
    }
  }


  async update(req, res) {
    try {
      await this.orderServices.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async cancel(req, res) {
    try {
      await this.orderServices.cancel(req.filter.id, req.data.ids);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
