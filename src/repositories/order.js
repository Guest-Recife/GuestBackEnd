import BaseRepository from './base';
import OrderModel from '../models/order';

export default class Order extends BaseRepository {
  constructor() {
    super(OrderModel);
  }
}
