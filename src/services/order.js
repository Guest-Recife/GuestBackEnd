import { pick } from 'lodash';

import Database from '../config/database';
import BaseService from './base';
import OrderRepository from '../repositories/order';
import FoodItemRepository from '../repositories/food-item';
import OrderItemRepository from '../repositories/order-item';
import Utils from '../utils/utils';

export default class Order extends BaseService {
  constructor() {
    super();

    this.orderRepository = new OrderRepository();
    this.foodItemRepository = new FoodItemRepository();
    this.orderItemRepository = new OrderItemRepository();
    this.database = new Database();
  }

  async create(data) {
    const foodItemIds = [];

    data.food_items.forEach(item => {
      if (!foodItemIds.includes(item.id)) {
        foodItemIds.push(item.id);
      }
    });

    const foodItems = await this.foodItemRepository.getItemsToCreate(foodItemIds);
    const foodItemsById = Utils.arrayToObject(foodItems, 'id');

    let totalPrice = 0;

    data.food_items.forEach(item => {
      item.info = foodItemsById[item.id];
      item.unit_price = item.info.price;

      totalPrice += item.quantity * item.unit_price;
    });

    await this.database.connection.transaction(async transaction => {
      const order = await this.orderRepository.create({
        register_id: data.register_id,
        price: totalPrice
      }, {
        transaction,
        returning: true
      });

      const promises = [];

      data.food_items.forEach(item => {
        promises.push(order.addFood_items(item.info, {
          through: pick(item, ['unit_price', 'quantity']),
          transaction
        }));
      });

      await Promise.all(promises);
    });

    return true;
  }

  async update(id, changes) {
    await this.orderRepository.update({
      where: { id }
    }, changes);

    return true;
  }

  async cancel(orderId, itemIds) {
    const orderItemsQtd = await this.orderItemRepository.count({
      where: {
        id: itemIds,
        is_deleted: false
      },
      paranoid: false
    });

    if (orderItemsQtd !== itemIds.length) {
      throw this.handleException('FOOD_ITEMS_NOT_FOUND');
    }

    await this.database.connection.transaction(async transaction => {
      await this.orderItemRepository.update({
        where: {
          id: itemIds
        },
        transaction
      }, { is_deleted: true });

      const foodItemsRemaining = await this.orderItemRepository.findAll({
        where: {
          order_id: orderId,
          is_deleted: false
        },
        paranoid: false,
        attributes: ['id', 'unit_price', 'quantity']
      });

      const qtdRemaining = foodItemsRemaining.length - itemIds.length;

      if (!qtdRemaining) {
        await this.orderRepository.delete({
          where: {
            id: orderId
          },
          transaction
        });
      } else {
        const totalPrice = foodItemsRemaining.reduce((price, item) => {
          if (!itemIds.includes(item.id)) {
            price += item.unit_price * item.quantity;
          }

          return price;
        }, 0);

        await this.orderRepository.update({
          where: {
            id: orderId
          }
        }, { price: totalPrice, transaction });
      }
    });

    return ;
  }
}
