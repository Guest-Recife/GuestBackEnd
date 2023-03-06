import BaseService from './base';
import TableRepository from '../repositories/tables';

export default class Table extends BaseService {
  constructor() {
    super();

    this.tableRepository = new TableRepository();
  }

  async create(data) {
    return this.tableRepository.create(data);
  }

  async list(id) {
    const tables = await this.tableRepository.findAll({
      restaurant_id: id
    });

    if (!tables) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return tables;
  }

  async find(id) {
    const table = await this.tableRepository.findOne({ id });

    if (!table) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return table;
  }

  async update(id, changes) {
    await this.tableRepository.update({
      where: { id }
    }, changes);

    return true;
  }
}
