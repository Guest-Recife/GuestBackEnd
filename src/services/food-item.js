import BaseService from './base';
import FoodItemRepository from '../repositories/food-item';

export default class FoodItem extends BaseService {
  constructor() {
    super();

    this.foodItemRepository = new FoodItemRepository();
  }

  async create(data) {
    return this.foodItemRepository.create(data);
  }

  async list(id) {
    const foodItems = await this.foodItemRepository.listAllByCategory({
      restaurant_id: id
    });

    if (!foodItems.length) throw this.handleException('NOT_FOUND', 400);

    return foodItems;
  }

  async update(id, changes) {
    await this.foodItemRepository.update({
      where: { id }
    }, changes);

    return true;
  }
}
