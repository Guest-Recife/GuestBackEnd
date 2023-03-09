import BaseService from './base';
import TableRepository from '../repositories/table';

export default class Table extends BaseService {
  constructor() {
    super();

    this.tableRepository = new TableRepository();
  }

  create(data) {
    return this.tableRepository.create(data);
  }

  async list(id) {
    const tables = await this.tableRepository.findAll({
      restaurant_id: id
    });

    if (!tables) throw this.handleException('NOT_FOUND', 400);

    return tables;
  }

  async find(id) {
    const table = await this.tableRepository.findOne({ id });

    if (!table) throw this.handleException('NOT_FOUND', 400);

    return table;
  }

  async update(id, changes) {
    await this.tableRepository.update({
      where: { id }
    }, changes);

    return true;
  }
}
