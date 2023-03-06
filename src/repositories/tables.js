import BaseRepository from './base';
import TableModel from '../models/tables';

export default class Table extends BaseRepository {
  constructor() {
    super(TableModel);
  }
}
