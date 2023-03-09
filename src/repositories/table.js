import BaseRepository from './base';
import TableModel from '../models/table';

export default class Table extends BaseRepository {
  constructor() {
    super(TableModel);
  }
}
