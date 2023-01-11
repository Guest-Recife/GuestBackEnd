import BaseService from './base';
import FoodItemRepository from '../repositories/food_item';

export default class FoodItem extends BaseService {
  constructor() {
    super();

    this.foodItemRepository = new FoodItemRepository();
  }

  async create(data) {
    const food_item = await this.foodItemRepository.findOne({
      where: { name: data.name }
    });

    if (food_item) throw this.handleException({ error: 'ALREADY_EXISTS', code: 401});

    return this.foodItemRepository.create(data);
  }

  async list(id) {
    const food_items = await this.foodItemRepository.findAll({
      where: {
        restaurant_id: id
      },
      attributes: ['name', 'description', 'price']
    });

    if (!food_items) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return food_items;
  }

  update(id, changes) {
    return this.foodItemRepository.update({
      where: { id }
    }, changes);
  }
}
