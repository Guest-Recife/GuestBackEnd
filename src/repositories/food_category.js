import BaseRepository from './base';
import FoodCategoryModel from '../models/food_category';

export default class FoodCategory extends BaseRepository {
  constructor() {
    super(FoodCategoryModel);
  }
}
