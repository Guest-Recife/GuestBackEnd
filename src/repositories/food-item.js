import BaseRepository from './base';
import FoodItemModel from '../models/food-item';

export default class FoodItem extends BaseRepository {
  constructor() {
    super(FoodItemModel);
  }
}
