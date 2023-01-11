import BaseService from './base';
import FoodCategoryRepository from '../repositories/food-category';

export default class FoodCategory extends BaseService {
  constructor() {
    super();

    this.foodCategoryRepository = new FoodCategoryRepository();
  }

  async create(data) {
    const foodCategory = await this.foodCategoryRepository.findOne({
      where: { name: data.name }
    });

    if (foodCategory) throw this.handleException({ error: 'ALREADY_EXISTS', code: 401});

    return this.foodCategoryRepository.create(data);
  }

  async list(id) {
    const foodCategories = await this.foodCategoryRepository.findAll({
      where: {
        restaurant_id: id
      },
      attributes: ['name']
    });

    if (!foodCategories) throw this.handleException({ error: 'NOT_FOUND', code: 400 });

    return foodCategories;
  }

  update(id, changes) {
    return this.foodCategoryRepository.update({
      where: { id }
    }, changes);
  }
}
