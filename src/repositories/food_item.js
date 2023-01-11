import BaseRepository from './base';
import FoodItemModel from '../models/food_item';

export default class FoodItem extends BaseRepository {
  constructor() {
    super(FoodItemModel);
  }
}
