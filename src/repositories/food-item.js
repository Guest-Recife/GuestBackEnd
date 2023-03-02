import BaseRepository from './base';
import FoodItemModel from '../models/food-item';
import FoodCategoryModel from '../models/food-category';

export default class FoodItem extends BaseRepository {
  constructor() {
    super(FoodItemModel);

    this.foodCategoryModel = FoodCategoryModel;
  }

  listAllByCategory(filter) {
    return this.foodCategoryModel.findAll({
      where: {
        ...filter
      },
      include: [{
        model: this.model,
        attributes: ['name', 'description', 'price']
      }],
      attributes: ['name']
    });
  }
}
