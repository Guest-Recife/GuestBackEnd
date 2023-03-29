import BaseRepository from './base';
import FoodItemModel from '../models/food-item';
import FoodCategory from './food-category';

export default class FoodItem extends BaseRepository {
  constructor() {
    super(FoodItemModel);

    this.foodCategoryRepository = FoodCategory;
  }

  async getItemsToCreate(ids) {
    return this.findAll({
      where: {
        id: ids,
        deleted_at: null
      },
      paranoid: false,
      raw: false
    });
  }

  listAllByCategory(filter) {
    return this.foodCategoryRepository.findAll({
      where: {
        ...filter,
        deleted_at: null
      },
      include: [{
        model: this.model,
        attributes: ['name', 'description', 'price']
      }],
      paranoid: false,
      attributes: ['name']
    });
  }
}
