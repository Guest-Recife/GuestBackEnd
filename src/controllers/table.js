import TableServices from '../services/table';
import BaseController from './base';

export default class Table extends BaseController {
  constructor() {
    super();

    this.tableServices = new TableServices();

    this.list = this.list.bind(this);
    this.find = this.find.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req, res) {
    try {
      await this.tableServices.create(req.data);

      this.handleSuccess(res, req.data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async list(req, res) {
    try {
      const tables = await this.tableServices.list(req.filter.id);

      this.handleSuccess(res, tables);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async find(req, res) {
    try {
      const table = await this.tableServices.find(req.filter.id);

      this.handleSuccess(res, table);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      await this.tableServices.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
