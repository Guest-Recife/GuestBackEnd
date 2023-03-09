import BaseRepository from './base';
import RegisterModel from '../models/register';
import Table from './table';

export default class Register extends BaseRepository {
  constructor() {
    super(RegisterModel);

    this.tableRepository = new Table();
  }

  findWithTable(filter) {
    return this.findOne({
      where: {
        ...filter,
        deleted_at: null
      },
      include: {
        model: this.tableRepository.getModel(),
        where: {
          deleted_at: null
        },
        paranoid: false,
        attributes: ['id']
      },
      paranoid: false,
      attributes: []
    });
  }
}
