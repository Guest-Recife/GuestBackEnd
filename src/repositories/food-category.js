import BaseRepository from './base';
import FoodCategoryModel from '../models/food-category';

export default class FoodCategory extends BaseRepository {
  constructor() {
    super(FoodCategoryModel);
  }
}
