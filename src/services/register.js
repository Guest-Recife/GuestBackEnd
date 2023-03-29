import moment from 'moment';

import BaseService from './base';
import Database from '../config/database';
import RegisterRepository from '../repositories/register';
import TableRepository from '../repositories/table';

export default class Register extends BaseService {
  constructor() {
    super();

    this.registerRepository = new RegisterRepository();
    this.tableRepository = new TableRepository();
    this.database = new Database();
  }

  async create(options) {
    const table = await this.tableRepository.findOne({
      where: {
        code: options.code,
        restaurant_id: options.restaurant_id,
        deleted_at: null
      },
      paranoid: false,
      attributes: ['id', 'is_crowded']
    });

    if (!table) {
      throw this.handleException('NOT_FOUND', 400);
    } else if (table.is_crowded) {
      throw this.handleException('TABLE_CROWDED', 401);
    }

    const data = {
      check_in: moment(),
      table_id: table.id,
      user_id: options.user_id,
      restaurant_id: options.restaurant_id
    };

    await this.database.connection.transaction(async transaction => {
      await Promise.all([
        this.registerRepository.create(data, { transaction }),
        this.tableRepository.update({
          where: {
            id: data.table_id
          },
          transaction
        }, { is_crowded: true })
      ]);
    });

    return true;
  }

  async close(filter) {
    const register = await this.registerRepository.findWithTable(filter);

    if (!register) {
      throw this.handleException('NOT_FOUND', 400);
    }

    filter.table_id = register['table.id'];

    await this.database.connection.transaction(async transaction => {
      await Promise.all([
        this.registerRepository.update({
          where: {
            id: filter.id
          },
          transaction
        }, { check_out: moment() }),
        this.tableRepository.update({
          where: {
            id: filter.table_id
          },
          transaction
        }, { is_crowded: false })
      ]);
    });

    return true;
  }
}
