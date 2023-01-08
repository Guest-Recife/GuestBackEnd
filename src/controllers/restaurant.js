import RestaurantServices from '../services/restaurant';
import BaseController from './base';

export default class Restaurant extends BaseController {
  constructor() {
    super();

    this.restaurantService = new RestaurantServices();

    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
  }

  async list(req, res) {
    try {
      let restaurant;

      if (req.filter.id) {
        restaurant = await this.restaurantService.find(req.filter.id);
      } else {
        restaurant = await this.restaurantService.index();
      }

      this.handleSuccess(res, restaurant);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      await this.restaurantService.update(req.filter.id, req.data);

      this.handleSuccess(res);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
