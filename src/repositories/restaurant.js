import BaseRepository from './base';
import RestaurantModel from '../models/restaurant';

export default class Restaurant extends BaseRepository {
  constructor() {
    super(RestaurantModel);
  }
}
