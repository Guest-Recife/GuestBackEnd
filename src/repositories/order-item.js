import BaseRepository from './base';
import OrderItemModel from '../models/order-item';

export default class OrderItem extends BaseRepository {
  constructor() {
    super(OrderItemModel);
  }
}
