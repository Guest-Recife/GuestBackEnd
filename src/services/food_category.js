import BaseService from './base';
import FoodCategoryRepository from '../repositories/food_category';

export default class FoodCategory extends BaseService {
  constructor() {
    super();

    this.foodCategoryRepository = new FoodCategoryRepository();
  }

  async create(data) {
    const food_category = await this.foodCategoryRepository.findOne({
      where: { name: data.name }
    });

    if (food_category) throw this.handleException({ error: 'ALREADY_EXISTS', code: 401});

    return this.foodCategoryRepository.create(data);
  }

  async list(id) {
    const food_categories = await this.foodCategoryRepository.findAll({
      where: {
        restaurant_id: id
      },
      attributes: ['name']
    });

    if (!food_categories) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return food_categories;
  }

  update(id, changes) {
    return this.foodCategoryRepository.update({
      where: { id }
    }, changes);
  }
}
