import BaseService from './base';
import FoodItemRepository from '../repositories/food-item';

export default class FoodItem extends BaseService {
  constructor() {
    super();

    this.foodItemRepository = new FoodItemRepository();
  }

  async create(data) {
    const foodItem = await this.foodItemRepository.findOne({
      where: { name: data.name }
    });

    if (foodItem) throw this.handleException({ error: 'ALREADY_EXISTS', code: 401});

    return this.foodItemRepository.create(data);
  }

  async list(id) {
    const foodItems = await this.foodItemRepository.findAll({
      where: {
        restaurant_id: id
      },
      attributes: ['name', 'description', 'price']
    });

    if (!foodItems) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return foodItems;
  }

  update(id, changes) {
    return this.foodItemRepository.update({
      where: { id }
    }, changes);
  }
}
